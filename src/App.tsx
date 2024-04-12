import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import PieChart from './PieChart';
import { Item } from './types';
//import Gauge from './G2/Gauge';
import Gauge from './D3/gauge/Gauge';
import WidgetRatingGaugeChart from './components/widgetRatingGaugeChart/WidgetRatingGaugeChart';

const data: Item[] = [
  { rating: '7', count: 28 },
  { rating: '2', count: 12 },
  { rating: '5', count: 45 },
  { rating: '4', count: 25 },
];

function App() {

  return (
    <Theme preset={presetGpnDefault}>
      {/* <PieChart header='Доля оценок' data={data}/> */}
      <WidgetRatingGaugeChart />
      {/* <Gauge value={0}></Gauge> */}
      {/* <GaugeChart /> */}
      
    </Theme>
  )
}

export default App
