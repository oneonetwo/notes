/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-02-28 09:50:11
 * @LastEditors: jy
 * @LastEditTime: 2023-02-28 11:33:06
 */
let redis = require('redis');
let client1 = redis.createClient(6379, '127.0.0.1');
let client2 = redis.createClient(6379, '127.0.0.1');

client1.subscribe('channel_a');
client1.subscribe('channel_b');

client1.on('message', (channel, message)=>{
    console.log('client1', channel, message);
})

client2.publish('channle_1', 'a_hello');
client2.publish('channle_b', 'a_hello');