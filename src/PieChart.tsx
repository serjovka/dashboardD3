import { Pie } from '@consta/charts/Pie';
import { Text } from '@consta/uikit/Text';
import { Item } from './types';

type PieChartProps = {
    header: string,
    data: Item[],
}

export default function PieChart({ header, data }: PieChartProps ){
    return(
        <>
            <Text>
                {header}
            </Text>
            <Pie
                style={{
                    width: 400,
                    height: "100%",
                    minHeight: 200,
                }}
                tooltip={false}
                legend={false}
                radius={0.8}
                data={data}
                angleField="count"
                colorField="rating"
                label={{
                    type: 'outer',
                    formatter: (v) => {
                        return `${v?.rating}; ${v?.count}%`
                    },
                    offset: '40%',
                    style: {
                        textAlign: 'center',
                        fontSize: 14,
                    },
                }}
            />
        </>
    );
}