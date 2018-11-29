module.exports = function orderSystemWith(orderDAO) {
    return {
        display(orderId, callback) {
            orderDAO.byId(orderId, (error, order) => {
                if (Array.isArray(order) && order.length === 0) {
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
                    callback(null, result);
                } else {
                    callback(new Error(`Unknown order: \n${JSON.stringify(order)}`));
                }
            });
        },
    };
};
