import Vue from 'vue';
import Message from "./Message";
import {eventBus} from '@/tools'


Vue.prototype.$Message = Message;
Vue.prototype.$eventBus = eventBus;