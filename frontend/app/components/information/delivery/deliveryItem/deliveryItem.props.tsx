import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DeliveryItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  currentDeliveryId: string | undefined,
  data: any,
  title: string
}