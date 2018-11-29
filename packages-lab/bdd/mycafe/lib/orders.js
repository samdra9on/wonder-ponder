module.exports = function orderSystemWith(orderDAO) {
    return {
        display(orderId) {
            const order = orderDAO.byId(orderId);
            if (Array.isArray(order) && order.length === 0) {
                return {
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
            }
            return null;
        },
    };
};
