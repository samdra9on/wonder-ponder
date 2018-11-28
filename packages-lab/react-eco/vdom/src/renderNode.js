export const renderNode = vnode => {
    let el;

    const { nodeName, attributes, children } = vnode;

    if (vnode.split) return document.createTextNode(vnode);

    el = document.createElement(nodeName);

    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }

    (children || []).forEach(child => el.appendChild(renderNode(child)));

    return el;
};
