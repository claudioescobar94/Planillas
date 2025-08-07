import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { mes: 'Ene', cantidad: 5 },
  { mes: 'Feb', cantidad: 7 },
  { mes: 'Mar', cantidad: 4 },
  { mes: 'Abr', cantidad: 8 },
  { mes: 'May', cantidad: 6 },
  { mes: 'Jun', cantidad: 9 },
];

export default function KpiLotoChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="cantidad" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}
