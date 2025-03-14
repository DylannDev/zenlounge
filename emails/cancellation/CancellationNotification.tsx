import { formatDate } from "@/lib/utils";
import {
  Body,
  Column,
  Container,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = "https://zenlounge-guyane.vercel.app";

type CancellationNotificationProps = {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  date?: string;
  time?: string;
  dateFrom?: string;
  dateTo?: string;
  forfaitId?: string | null;
  isRentBooking?: boolean;
};

export const CancellationNotification = ({
  clientName,
  clientEmail,
  clientPhone,
  serviceName,
  date,
  time,
  dateFrom,
  dateTo,
  forfaitId,
  isRentBooking,
}: CancellationNotificationProps) => (
  <Tailwind>
    <Html>
      <Preview>Annulation d'une réservation</Preview>
      <Body className="bg-white m-0 font-sans">
        <Container className="mx-auto px-[10px] py-6">
          <Img
            alt="Zen Lounge logo"
            width="200"
            className="mx-auto"
            src={`${baseUrl}/logo.png`}
          />
          <Hr className="mx-0 my-[28px] w-full border border-solid !border-gray-300" />

          <Text className="text-xl font-bold text-gray-700 mb-6">
            Une réservation a été annulée !
          </Text>

          <Text className="text-base text-gray-700 mb-6">
            <strong>{clientName}</strong> a annulé une réservation :
          </Text>

          {/* Détails de l'annulation */}
          <Section className="mt-10">
            <Row>
              <Column className="w-[48px] pr-5">
                <Img
                  alt="service icon"
                  height="48"
                  src={`${baseUrl}/lotus.png`}
                  width="48"
                />
              </Column>
              <Column>
                <Text className="m-0 text-[18px] font-semibold leading-[20px] text-gray-900">
                  {serviceName}
                </Text>
                <Text className="m-0 mt-[8px] text-[16px] leading-[24px] text-gray-500">
                  {isRentBooking
                    ? `Du ${formatDate(dateFrom!)} au ${formatDate(dateTo!)}`
                    : `${formatDate(date!)} à ${time}`}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr className="mx-0 my-[28px] w-full border border-solid !border-gray-300" />

          {/* Informations du client */}
          <Section>
            <Row>
              <Column>
                <Text className="m-0 text-[18px] font-semibold leading-[20px] text-gray-900">
                  Informations du client :
                </Text>
                <Text className="m-0 mt-[8px] text-[16px] leading-[24px] text-gray-500">
                  <strong>Nom :</strong> {clientName}
                </Text>
                <Text className="m-0 mt-[4px] text-[16px] leading-[24px] text-gray-500">
                  <strong>Email :</strong> {clientEmail}
                </Text>
                <Text className="m-0 mt-[4px] text-[16px] leading-[24px] text-gray-500">
                  <strong>Téléphone :</strong> {clientPhone}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr className="mx-0 my-[28px] w-full border border-solid !border-gray-300" />

          {/* Message spécifique selon le type d'annulation */}
          <Text className="text-sm text-gray-500 mb-8">
            {isRentBooking
              ? "Le client a été informé qu'il doit appeler l'établissement pour reprogrammer ou obtenir un remboursement."
              : forfaitId === null
                ? "Le client a été crédité d'un crédit."
                : "Son forfait a été recrédité d'une séance."}
          </Text>

          <Hr className="mx-0 mt-[28px] w-full border border-solid !border-gray-300" />
          <Section>
            <Text className="text-xs text-gray-500 text-center">
              © 2025 Zen Lounge, Tous droits réservés. <br />
              contact@zenlounge.fr | +594 694 00 39 35
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default CancellationNotification;
