module.exports = function orderSystemWith(orderDAO) {
    return {
        display(orderId) {
            return orderDAO.byId(orderId).then(order => {
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
                    return result;
                }
                throw new Error(`Unknown order: \n${JSON.stringify(order)}`);
            });
        },
    };
};
