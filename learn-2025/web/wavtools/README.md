### wavtools 包含三个核心类:
1. WavRecorder - 用于录制音频
2. WavStreamPlayer - 用于播放音频流
3. AudioAnalysis - 用于音频分析

#### 1. WavRecorder 类详解
1. 最核心的录音功能类，主要API包括：
```js
// 1. 创建实例
const recorder = new WavRecorder({
  sampleRate: 44100,  // 采样率
  outputToSpeakers: false,  // 是否输出到扬声器
  debug: false  // 是否开启调试模式
});

// 2. 基本录音流程
await recorder.begin();  // 开始会话
await recorder.record();  // 开始录制
await recorder.pause();   // 暂停录制
await recorder.save();    // 保存录音
await recorder.end();     // 结束会话

```
2. 重要的方法说明：
    - begin() - 初始化录音设备并请求麦克风权限
    - record() - 开始录制音频
    - pause() - 暂停录制
    - save() - 将录制的内容保存为WAV格式
    - end() - 结束录音会话并释放资源


#### 2. WavStreamPlayer 类详解
1. 播放音频流，主要API
```js
// 1. 创建实例
const player = new WavStreamPlayer({
  sampleRate: 44100  // 采样率
});

// 2. 基本使用流程
await player.connect();  // 连接音频上下文
player.add16BitPCM(audioData);  // 添加音频数据
await player.interrupt();  // 中断播放
```
2. 主要方法：
    - connect() - 初始化音频上下文
    - add16BitPCM() - 添加16位PCM格式的音频数据
    - getTrackSampleOffset() - 获取当前播放位置
    - interrupt() - 中断当前播放



#### 3. AudioAnalysis 类详解
1. 用户分析音频频率特征的类，主要API
```js
// 1. 静态方法使用
const analysis = AudioAnalysis.getFrequencies(
  analyser,      // 分析器节点
  sampleRate,    // 采样率
  fftResult,     // FFT结果
  'frequency',   // 分析类型：'frequency'|'music'|'voice'
  -100,         // 最小分贝值
  -30           // 最大分贝值
);

// 2. 实例化使用
const audioAnalysis = new AudioAnalysis(audioElement, audioBuffer);
const frequencies = audioAnalysis.getFrequencies();
```


#### 4. 高级特性 
1. 音频分析支持三种模式：
   1. frequency - 原始频率分
   2. music - 音乐音符频率分析 
   3. voice - 人声频率范围分析
2. 设备管理
```js
// 监听设备变化
recorder.listenForDeviceChange((devices) => {
  console.log('可用设备:', devices);
});

// 列出所有可用设备
const devices = await recorder.listDevices();
```
3. 实时音频处理
```js
// 在录制时处理音频块
recorder.record((chunk) => {
  console.log('接收到音频数据:', chunk);
}, 8192);  // 设置块大小
```

#### 5. 技术实现细节
1. 使用**Web Audio API**的AudioWorklet 进行音频处理
2. 支持 `PCM16` 格式的音频数据
3. 使用 FFT (快速傅里叶变换) 进行频率分析
4. 支持多声道音频处理
5. 实现了音频数据的实时流处理

#### 6. 使用示例

```js
async function recordExample(){
    const recorder = new WavRecorder();
    // 开始录音会话
    await recorder.begin();

    // 开始录制
    await recorder.record((chunk) => {
        // 实时处理音频数据
        console.log('音频数据块:', chunk);
    });
    // 开始录制
    await recorder.record((chunk) => {
    // 实时处理音频数据
        console.log('音频数据块:', chunk);
    });


```
