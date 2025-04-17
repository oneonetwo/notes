// volume-processor.js
class VolumeProcessor extends AudioWorkletProcessor {
    process(inputs) {
      const inputChannels = inputs;
      if (inputChannels && inputChannels.length > 0) {
        // 计算当前音频帧的均方根（RMS）作为音量
        let sum = 0;
        for (const sample of inputChannels) {
          sum += sample * sample;
        }
        const rms = Math.sqrt(sum / inputChannels.length);
        
        // 发送音量数据到主线程
        this.port.postMessage({ volume: rms });
      }
      return true; // 持续处理
    }
  }
  
  registerProcessor('volume-processor', VolumeProcessor);
  