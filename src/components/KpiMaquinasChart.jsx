import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { nombre: 'F.41.29', horas: 16 },
  { nombre: 'VP.41.03.03', horas: 10 },
  { nombre: 'P.41.04.01', horas: 7 },
  { nombre: 'S.47.05', horas: 9 },
];

const colores = ['#facc15', '#fbbf24', '#f59e0b', '#d97706'];

export default function KpiMaquinasChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          dataKey="horas"
          nameKey="nombre"
          outerRadius={80}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={colores[index % colores.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
