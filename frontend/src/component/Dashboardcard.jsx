import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardCard({ title, value, icon }) {
  return (
    <Card className="shadow-md hover:shadow-xl transition duration-300 rounded-2xl">
      
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>

        <div className="text-gray-600">
          {icon}
        </div>
      </CardHeader>

      <CardContent>
        <h2 className="text-3xl font-bold">{value}</h2>
      </CardContent>

    </Card>
  );
}