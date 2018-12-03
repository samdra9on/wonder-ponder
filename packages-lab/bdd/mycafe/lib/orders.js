const _ = require('lodash');

module.exports = function orderSystemWith(orderDAO) {
    return {
        display(orderId) {
            return new Promise((resolve, reject) => {
                orderDAO.byId(orderId, (error, order) => {
                    if (!Array.isArray(order)) {
                        reject(new Error('The order must be an array.'));
                    }

                    if (order.length === 0) {
                        const result = {
                            items: [],
                            totalPrice: 0,
                            actions: [
                                {
                                    action: 'append-beverage',
                                    target: orderId,
                                    parameters: {
                                        beverageRef: null,
                                        quantity: 0,
                                    },
                                },
                            ],
                        };
                        resolve(result);
                    } else {
                        const result = _.reduce(
                            order,
                            (accu, item, index) => {
                                const {
                                    beverage: { price },
                                    quantity,
                                } = item;
                                _.set(accu, `items[${index}]`, _.cloneDeep(item));
                                _.set(accu, 'totalPrice', accu.totalPrice + price * quantity);
                                return accu;
                            },
                            { totalPrice: 0 },
                        );

                        result.actions = [
                            {
                                action: 'place-order',
                                target: orderId,
                            },
                            {
                                action: 'append-beverage',
                                target: orderId,
                                parameters: {
                                    beverageRef: null,
                                    quantity: 0,
                                },
                            },
                        ];

                        const removeActions = _.reduce(
                            order,
                            (accu, item) => {
                                const newAccu = _.concat(accu, {
                                    action: 'remove-beverage',
                                    target: orderId,
                                    parameters: {
                                        beverageRef: item.beverage.id,
                                    },
                                });

                                return newAccu;
                            },
                            [],
                        );
                        result.actions = _.concat(result.actions, removeActions);

                        const editActions = _.reduce(
                            order,
                            (accu, item) => {
                                const newAccu = _.concat(accu, {
                                    action: 'edit-beverage',
                                    target: orderId,
                                    parameters: {
                                        beverageRef: item.beverage.id,
                                        newQuantity: item.quantity,
                                    },
                                });
                                return newAccu;
                            },
                            [],
                        );
                        result.actions = _.concat(result.actions, editActions);

                        resolve(result);
                    }
                });
            });
        },
    };
};
