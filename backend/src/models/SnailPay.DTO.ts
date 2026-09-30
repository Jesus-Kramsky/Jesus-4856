export interface SnailPayRequest {
  cardNumber: number;
  expireDate: string;
  cvv: number;
  name: string;
  amount: number;
}

export interface SnailPayResponse {
  id: number;
  status: string;
  status_detail: string;
  transaction_amount: number;
  date_created: Date;
  authorization_code: string;
  reference: string;
  payer_id: string;
  payer_email: string;
  cvv: number;
  cardNumber: number;
}
