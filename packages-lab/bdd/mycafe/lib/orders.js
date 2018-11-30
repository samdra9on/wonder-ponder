module.exports = function orderSystemWith(orderDAO) {
    return {
        display(orderId) {
            return new Promise((resolve, reject) => {
                orderDAO.byId(orderId, (error, order) => {
                    if (error) {
                        reject(error);
                    }

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
                        resolve(result);
                    } else {
                        reject(new Error(`Unknown order: \n${JSON.stringify(order)}`));
                    }
                });
            });
        },
    };
};
