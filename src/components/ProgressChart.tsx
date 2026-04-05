import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function ProgressChart({ data }) {
  if (!data.length) {
    return <View style={styles.empty}><Text>No data yet. Add subjects and log hours.</Text></View>;
  }
  const labels = data.map(d => d.subjectName.slice(0,6));
  const completed = data.map(d => d.totalHours);
  const target = data.map(d => d.targetHours);
  const chartData = { labels, datasets: [{ data: completed }, { data: target }] };
  return (
    <BarChart
      data={chartData}
      width={Dimensions.get('window').width - 72}
      height={220}
      yAxisLabel=""
      yAxisSuffix="h"
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 0,
        color: (opacity = 1, index) => {
          return index === 0 ? '#DC2626' : '#F87171';
        }
      }}
      style={styles.chart}
    />
  );
}
const styles = StyleSheet.create({ empty: { alignItems: 'center', padding: 40 }, chart: { borderRadius: 16, marginVertical: 8 } });
