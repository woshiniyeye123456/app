import Vue from 'vue';
const errorHandler = (error, vm, info) => {
    console.error('抛出全局异常');
    console.error('error---' + error);
    console.error('vm---' + vm);
    console.error('info---' + info);
};

Vue.config.errorHandler = errorHandler;
// Vue.prototype.$throw = (error) => errorHandler(error);
