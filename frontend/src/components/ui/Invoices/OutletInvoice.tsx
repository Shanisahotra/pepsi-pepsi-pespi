import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

interface InvoiceProps {
  order: any;
}

const OutletInvoice: React.FC<InvoiceProps> = ({ order }) => {
  const subtotal = order.subtotal || 0;
  const tax = subtotal * 0.16;
  const total = order.total || subtotal + tax;

  return (
    <Card className="w-full shadow-xl rounded-2xl">

      {/* HEADER */}
      <CardHeader className="flex flex-row justify-between items-center">

        <div>
          <CardTitle className="text-blue-700 text-lg">
            PEPSI
          </CardTitle>
          <p className="text-muted-foreground">
            Outlet Invoice
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold">
            Invoice #: {order.id}
          </p>
          <p className="text-sm text-muted-foreground">
            Date: {new Date(order.createdAt).toISOString().split("T")[0]}
          </p>
        </div>

      </CardHeader>

      <CardContent>

        {/* OUTLET INFO */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          <div>
            <h2 className="font-semibold text-muted-foreground">
              Bill To:
            </h2>
            <p>{order.outlet?.name}</p>
            <p>{order.outlet?.owner}</p>
            <p>{order.outlet?.address}</p>
            <p>{order.outlet?.phone}</p>
          </div>

          <div className="text-right">
            <h2 className="font-semibold text-muted-foreground">
              Company:
            </h2>
            <p>Pepsi Co.</p>
            <p>Distribution Center</p>
          </div>

        </div>

        <Separator className="mb-4" />

        {/* TABLE */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-center">Qty</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Order Total</TableCell>
              <TableCell className="text-center">-</TableCell>
              <TableCell className="text-center">-</TableCell>
              <TableCell className="text-center">
                Rs. {subtotal}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Separator className="my-6" />

        {/* SUMMARY */}
        <div className="flex justify-end">

          <div className="w-full max-w-sm space-y-2">

            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (16%):</span>
              <span>Rs. {tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-10 text-center text-muted-foreground text-sm">
          Thank you for doing business with Pepsi!
        </div>

      </CardContent>

    </Card>
  );
};

export default OutletInvoice;