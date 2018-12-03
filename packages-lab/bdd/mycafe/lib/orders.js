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
                        resolve(result);
                    }
                });
            });
        },
    };
};
