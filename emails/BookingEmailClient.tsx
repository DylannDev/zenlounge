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

type BookingNotificationDataType = Omit<
  BookingDataType,
  "clientEmail" | "clientPhone"
>;

const baseUrl = "https://zenlounge-guyane.vercel.app";

export const BookingEmailClient = ({
  clientName,
  serviceName,
  date,
  time,
  duration,
  price,
}: BookingNotificationDataType) => (
  <Tailwind>
    <Html>
      <Preview>Votre réservation est confirmée</Preview>
      <Body className="bg-white m-0 font-sans">
        <Container className="mx-auto px-5 py-6">
          <Img
            alt="service icon"
            height="48"
            src={`${baseUrl}/logo.png`}
            width="48"
          />
          {/* Welcome Text */}
          <Text className="text-lg text-gray-700 mb-6">
            Bonjour {clientName},
          </Text>

          <Text className="text-lg text-gray-700 mb-6">
            Votre réservation est confirmée :
          </Text>

          {/* Reservation Details */}
          <Section className="mt-10">
            <Row>
              <Column className="align-baseline mr-4">
                <Img
                  alt="service icon"
                  height="48"
                  src={`${baseUrl}/lotus.png`}
                  width="48"
                />
              </Column>
              <Column className="w-[85%]">
                <Text className="m-0 text-[18px] font-semibold leading-[20px] text-gray-900">
                  Prestation choisie
                </Text>
                <Text className="m-0 mt-[8px] text-[16px] leading-[24px] text-gray-500">
                  {serviceName} • {duration} min • {price}€
                </Text>
              </Column>
            </Row>
          </Section>
          <Hr className="mx-0 my-[28px] w-full border border-solid !border-gray-300" />
          <Section>
            <Row>
              <Column className="align-baseline mr-4">
                <Img
                  alt="calendar icon"
                  height="48"
                  src={`${baseUrl}/calendar.png`}
                  width="48"
                />
              </Column>
              <Column className="w-[85%]">
                <Text className="m-0 text-[18px] font-semibold leading-[20px] text-gray-900">
                  Date et Heure
                </Text>
                <Text className="m-0 mt-[8px] text-[16px] leading-[24px] text-gray-500">
                  {formatDate(date)} à {time}
                </Text>
              </Column>
            </Row>
          </Section>
          <Hr className="mx-0 my-[28px] w-full border border-solid !border-gray-300" />
          <Section className="mb-10">
            <Row>
              <Column className="align-baseline mr-4">
                <Img
                  alt="location icon"
                  height="48"
                  src={`${baseUrl}/location.png`}
                  width="48"
                />
              </Column>
              <Column className="w-[85%]">
                <Text className="m-0 text-[18px] font-semibold leading-[20px] text-gray-900">
                  Adresse
                </Text>
                <Text className="m-0 mt-[8px] text-[16px] leading-[24px] text-gray-500">
                  87 Les Hauts de la Chaumière, 97351 Matoury
                </Text>
              </Column>
            </Row>
          </Section>
          <Text className="text-sm text-gray-500 mb-8">
            Nous avons hâte de vous accueillir pour ce moment de bien-être. Si
            vous avez des questions ou souhaitez modifier votre réservation,
            n'hésitez pas à nous contacter.
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
