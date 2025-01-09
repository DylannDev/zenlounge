import { formatDate } from "@/lib/utils";
import {
  Body,
  Column,
  Container,
  Heading,
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

type BookingNotificationDataType = Omit<BookingDataType, "clientEmail">;

const baseUrl = "https://zenlounge-guyane.vercel.app";

export const BookingEmailClient = ({
  clientName,
  serviceName,
  date,
  time,
  duration,
  price,
  clientPhone,
}: BookingNotificationDataType) => (
  <Tailwind>
    <Html>
      <Preview>Vous avez une nouvelle réservation</Preview>
      <Body className="bg-white m-0 font-sans">
        <Container className="mx-auto px-5 py-6">
          <Img
            alt="service icon"
            width="200"
            className="mx-auto"
            src={`${baseUrl}/logo.png`}
          />
          {/* Welcome Text */}
          <Text className="text-2xl font-bold text-gray-700 mb-6">
            Vous avez une nouvelle réservation !
          </Text>

          {/* Reservation Details */}
          <Section className="mt-10">
            <Row>
              <Column className="align-baseline pr-5">
                <Img
                  alt="service icon"
                  height="48"
                  src={`${baseUrl}/lotus.svg`}
                  width="48"
                />
              </Column>
              <Column className="">
                <Text className="m-0 text-[18px] font-semibold leading-[20px] text-gray-900">
                  Réservé par :
                </Text>
                <Text className="m-0 mt-[8px] text-[16px] leading-[24px] text-gray-500">
                  {clientName} • {clientPhone}
                </Text>
                <Text className="m-0 mt-[8px] text-[16px] leading-[24px] text-gray-500">
                  {serviceName} • {duration} min • {price}€
                </Text>
              </Column>
            </Row>
          </Section>
          <Hr className="mx-0 my-[28px] w-full border border-solid !border-gray-300" />
          <Section className="mb-10">
            <Row>
              <Column className="align-baseline pr-5">
                <Img
                  alt="calendar icon"
                  height="48"
                  src={`${baseUrl}/calendar.svg`}
                  width="48"
                />
              </Column>
              <Column className="">
                <Text className="m-0 text-[18px] font-semibold leading-[20px] text-gray-900">
                  Date et Heure
                </Text>
                <Text className="m-0 mt-[8px] text-[16px] leading-[24px] text-gray-500">
                  {formatDate(date)} à {time}
                </Text>
              </Column>
            </Row>
          </Section>
          <Text className="text-sm text-gray-500 mb-8">
            Consultez vos réservations pour plus de détails.
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

export default BookingEmailClient;
