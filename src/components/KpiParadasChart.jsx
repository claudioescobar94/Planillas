import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { mes: 'Ene', horas: 10 },
  { mes: 'Feb', horas: 6 },
  { mes: 'Mar', horas: 4 },
  { mes: 'Abr', horas: 8 },
  { mes: 'May', horas: 5 },
  { mes: 'Jun', horas: 9 },
];

export default function KpiParadasChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="horas" stroke="#ef4444" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
