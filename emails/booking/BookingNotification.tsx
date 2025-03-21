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

type BookingNotificationDataType = Omit<BookingDataType, "clientEmail"> & {
  activeCredit?: Credit;
  activeForfait?: Forfait;
  dateFrom?: string | Date;
  dateTo?: string | Date;
  extraServices?: ExtraService[];
};

const baseUrl = "https://zenlounge-guyane.vercel.app";

export const BookingEmailClient = ({
  clientName,
  serviceName,
  date,
  time,
  duration,
  price,
  clientPhone,
  isForfait,
  activeCredit,
  activeForfait,
  dateFrom,
  dateTo,
  extraServices,
}: BookingNotificationDataType) => {
  let bookingType = "";
  let isActiveForfaitOrCredit = false;

  if (activeForfait) {
    bookingType = ` a utilisé une séance de son forfait ${activeForfait.serviceName} (${activeForfait.remainingSessions - 1}/${activeForfait.totalSessions} séances restantes).`;
    isActiveForfaitOrCredit = true;
  } else if (activeCredit) {
    bookingType = " a utilisé un crédit.";
    isActiveForfaitOrCredit = true;
  }

  return (
    <Tailwind>
      <Html>
        <Preview>Vous avez une nouvelle réservation</Preview>
        <Body className="bg-white m-0 font-sans">
          <Container className="mx-auto px-[10px] py-6">
            <Img
              alt="service icon"
              width="200"
              className="mx-auto"
              src={`${baseUrl}/logo.png`}
            />
            <Hr className="mx-0 my-[28px] w-full border border-solid !border-gray-300" />
            {/* Welcome Text */}
            <Text className="text-2xl font-bold text-gray-700 mb-6">
              {isForfait
                ? "Réservation d'un forfait !"
                : "Nouvelle réservation !"}
            </Text>

            {/* Reservation Details */}
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
                <Column className="">
                  <Text className="m-0 text-[18px] font-semibold leading-[20px] text-gray-900">
                    Réservé par :
                  </Text>
                  <Text className="m-0 mt-[8px] text-[16px] leading-[24px] text-gray-500">
                    {clientName} • {clientPhone}
                  </Text>
                  <Text className="m-0 mt-[8px] text-[16px] leading-[24px] text-gray-500">
                    {serviceName === "Serenity Suite"
                      ? "Location Serenity Suite"
                      : serviceName}{" "}
                    • {duration && `${duration} min •`}{" "}
                    {activeForfait
                      ? "Forfait utilisé"
                      : activeCredit
                        ? "Crédit utilisé"
                        : `${price}€`}
                  </Text>
                </Column>
              </Row>
            </Section>
            {extraServices && extraServices.length > 0 && (
              <>
                <Hr className="mx-0 my-[28px] w-full border border-solid !border-gray-300" />
                <Section>
                  <Text className="m-0 text-[18px] font-semibold leading-[20px] text-gray-900">
                    Services supplémentaires
                  </Text>
                  {extraServices.map((extra, index) => (
                    <Text
                      key={index}
                      className="m-0 mt-[8px] text-[16px] leading-[24px] text-gray-500"
                    >
                      {extra.quantity}x {extra.name}
                    </Text>
                  ))}
                </Section>
              </>
            )}
            <Hr className="mx-0 my-[28px] w-full border border-solid !border-gray-300" />
            <Section className="mb-10">
              <Row>
                <Column className="w-[48px] pr-5">
                  <Img
                    alt="calendar icon"
                    height="48"
                    src={`${baseUrl}/calendar.png`}
                    width="48"
                  />
                </Column>
                <Column className="">
                  <Text className="m-0 text-[18px] font-semibold leading-[20px] text-gray-900">
                    {dateFrom && dateTo
                      ? "Dates de réservation"
                      : "Date et Heure"}
                  </Text>
                  <Text className="m-0 mt-[8px] text-[16px] leading-[24px] text-gray-500">
                    {dateFrom && dateTo
                      ? `${formatDate(dateFrom)} → ${formatDate(dateTo)}`
                      : `${formatDate(date!)} à ${time}`}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Hr className="mx-0 my-[28px] w-full border border-solid !border-gray-300" />
            {isActiveForfaitOrCredit && (
              <Text className="m-0 mt-[8px] text-[16px] leading-[24px] text-gray-500">
                {clientName} {bookingType}
              </Text>
            )}
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
};

export default BookingEmailClient;
