const Debugger = function Debugger() {};
Debugger.log = function log(message) {
    try {
        console.log(message);
    } catch (exception) {
        /* eslint-disable no-empty */
    }
};

export default Debugger;
