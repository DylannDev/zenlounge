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

type BookingNotificationDataType = Omit<
  BookingDataType,
  "clientEmail" | "clientPhone"
> & {
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
  isForfait,
  activeCredit,
  activeForfait,
  dateFrom,
  dateTo,
  extraServices,
}: BookingNotificationDataType) => {
  // ✅ Déterminer le message spécifique selon le type de réservation
  let additionalMessage = "";

  if (activeForfait) {
    additionalMessage = `Cette séance a été débitée de votre forfait, il vous reste ${activeForfait.remainingSessions - 1}/${activeForfait.totalSessions} séances. Vous pouvez réserver vos prochaines séances sur votre espace client.`;
  } else if (activeCredit) {
    additionalMessage = `Cette séance a été débitée de votre crédit. Vous pouvez réserver une autre séance avec vos crédits restants.`;
  }
  return (
    <Tailwind>
      <Html>
        <Preview>Votre réservation est confirmée</Preview>
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
            <Text className="text-lg text-gray-700 mb-6">
              Bonjour {clientName},
            </Text>

            <Text className="text-lg text-gray-700 mb-6">
              Votre réservation est confirmée :
            </Text>
            {additionalMessage && (
              <Text className="text-sm text-gray-500 mb-6">
                {additionalMessage}
              </Text>
            )}

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
                    {activeForfait || isForfait === true
                      ? "Forfait choisi"
                      : "Prestation choisie"}
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

            {/* Extras */}
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
            <Section>
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
            <Section className="mb-10">
              <Row>
                <Column className="w-[48px] pr-5">
                  <Img
                    alt="location icon"
                    height="48"
                    src={`${baseUrl}/location.png`}
                    width="48"
                  />
                </Column>
                <Column className="">
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
};

export default BookingEmailClient;
