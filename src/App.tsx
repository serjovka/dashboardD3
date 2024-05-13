import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import WidgetRatingGaugeChart from './components/widgetRatingGaugeChart/WidgetRatingGaugeChart';
import WidgetParamsUseCase from './components/widgetParamsUseCase/WidgetParamsUseCase';
import WidgetEntryCountUseCase from './components/widgetEntryCountUseCase/WidgetEntryCountUseCase';
import WidgetRatingPieChartUseCase from './components/widgetRatingPieChartUseCase/WidgetRatingPieChartUseCase';
import WidgetRatingBarChartUseCase from './components/widgetRatingBarChartUseCase/WidgetRatingBarChartUseCase';

function App() {
  return (
    <Theme preset={presetGpnDefault}>
      <div className='dashboard'>
        <WidgetParamsUseCase />
        <div className='dashboard-row'> 
          <WidgetEntryCountUseCase />
          <div className='dashboard-common-widget'>
            <div className='legend'>
              <div className='legend__item legend__item_excellent'>Отлично</div>
              <div className='legend__item legend__item_good'>Хорошо</div>
              <div className='legend__item legend__item_satisfactory'>Удовлетворительно</div>
              <div className='legend__item legend__item_bad'>Неудовлетворительно</div>
              <div className='legend__item legend__item_cued'>Целевой уровень эффективности деятельности (ЦУЭД)</div>
            </div>
            <div  className='hl'/>
            <div className='dashboard-row'>
              <WidgetRatingGaugeChart />
              <div className='vl' />
              <WidgetRatingPieChartUseCase />
            </div>
          </div>
        </div>
        <div className='dashboard__solo-widget'>
            <div className='legend'>
              <div className='legend__item legend__item_blue'>Кол-во договоров I квартал 2023 года</div>
              <div className='legend__item legend__item_brand'>Кол-во договоров II квартал 2023 года</div>
            </div>
          <WidgetRatingBarChartUseCase />
        </div>
      </div>
    </Theme>
  );
}

export default App
