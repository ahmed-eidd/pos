import './App.less';
import { Button, Space, Input, Spin, Slider } from 'antd';

function App() {
  return (
    <div className=''>
      <Space direction='vertical'>
        <Input placeholder='Type here...' />
        <Button type='primary'>start</Button>
        <Spin spinning />
        <Slider />
      </Space>
    </div>
  );
}

export default App;
