import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
  Font,
  Preview,
  Row,
  Column,
  Img,
  Button,
} from "@react-email/components";
import {
  getClientTypeLabel,
  getServiceLabel,
} from "../../utility/getLabels.js";
import { config } from "../../config.js";

interface AppointmentDateChangeProps {
  firstName: string;
  service: "valutazione-psicodiagnostica" | "consulenza-psicologica";
  oldDate: string;
  oldTime: string;
  newDate: string;
  newTime: string;
  clientType: "bambini" | "adulti" | "anziani";
  protocolNumber?: string;
  confirmUrl: string;
  rejectUrl: string;
  expiresAt: string;
}

const AppointmentDateChange = ({
  firstName = "Mario",
  service = "consulenza-psicologica",
  oldDate = "25/03/2026",
  oldTime = "10:00",
  newDate = "30/03/2026",
  newTime = "11:00",
  clientType = "adulti",
  protocolNumber = "ASPIC-2026-0042",
  confirmUrl = "#",
  rejectUrl = "#",
  expiresAt = "27/03/2026",
}: AppointmentDateChangeProps) => (
  <Html lang="it" dir="ltr">
    <Head>
      <Font
        fontFamily="Georgia"
        fallbackFontFamily="serif"
        webFont={{
          url: "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3YmX5slCNuHLi8bLeY9MK7whWMhyjornFLsS6V7w.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>
      Proposta modifica orario — ASPIC Psicologia Reggio Calabria
    </Preview>
    <Body style={body}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Img
            src={`${config.ORIGIN}/logo_aspic.svg`}
            alt="ASPIC Psicologia"
            width={140}
            height="auto"
            style={{ margin: "0 auto", display: "block" }}
          />
        </Section>

        {/* Warning bar */}
        <Section style={warningBar}>
          <Text style={warningBarText}>⟳ Proposta modifica orario</Text>
        </Section>

        {/* Content */}
        <Section style={content}>
          <Heading style={heading}>
            È stato proposto un <span style={headingEm}>nuovo orario</span>
          </Heading>

          <Text style={paragraph}>
            Ciao <strong style={strong}>{firstName}</strong>,
          </Text>
          <Text style={paragraph}>
            Il nostro staff ha proposto una modifica all'orario del tuo
            appuntamento per{" "}
            <strong style={strong}>{getServiceLabel(service)}</strong>. Ti
            chiediamo di confermare o rifiutare la proposta entro il{" "}
            <strong style={strong}>{expiresAt}</strong>.
          </Text>

          {/* Riepilogo orari */}
          <Section style={summaryCard}>
            <Text style={summaryTitle}>Modifica proposta</Text>
            <Hr style={summaryDivider} />

            <Row style={summaryRow}>
              <Column style={summaryLabel}>Protocollo</Column>
              <Column style={summaryValue}>
                <span style={protocol}>{protocolNumber}</span>
              </Column>
            </Row>
            <Row style={summaryRow}>
              <Column style={summaryLabel}>Servizio</Column>
              <Column style={summaryValue}>{getServiceLabel(service)}</Column>
            </Row>
            <Row style={summaryRow}>
              <Column style={summaryLabel}>Tipo paziente</Column>
              <Column style={summaryValue}>
                {getClientTypeLabel(clientType)}
              </Column>
            </Row>

            <Hr style={summaryDivider} />

            <Row style={summaryRow}>
              <Column style={summaryLabel}>Orario precedente</Column>
              <Column style={summaryValueMuted}>
                <span style={oldDateStyle}>
                  {oldDate} alle {oldTime}
                </span>
              </Column>
            </Row>
            <Row style={summaryRow}>
              <Column style={summaryLabel}>Nuovo orario</Column>
              <Column style={summaryValue}>
                <span style={newDateStyle}>
                  {newDate} alle {newTime}
                </span>
              </Column>
            </Row>
          </Section>

          {/* CTA */}
          <Section style={ctaSection}>
            <Row>
              <Column style={ctaColumnLeft}>
                <Button href={confirmUrl} style={confirmButton}>
                  ✓ Confermo il nuovo orario
                </Button>
              </Column>
              <Column style={ctaColumnRight}>
                <Button href={rejectUrl} style={rejectButton}>
                  ✕ Rifiuto — annulla richiesta
                </Button>
              </Column>
            </Row>
          </Section>

          <Section style={warningNote}>
            <Text style={warningNoteText}>
              ⚠ Se non risponde entro il {expiresAt}, la sua richiesta verrà
              annullata automaticamente.
            </Text>
          </Section>

          <Hr style={divider} />

          <Text style={smallNote}>
            Rifiutando la modifica la sua richiesta verrà annullata. Per
            qualsiasi domanda contattaci a{" "}
            <Link href="mailto:info@aspicrc.it" style={link}>
              info@aspicrc.it
            </Link>
            , indicando il numero di protocollo{" "}
            <strong style={strong}>{protocolNumber}</strong>.
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            © {new Date().getFullYear()} ASPIC Psicologia Reggio Calabria
          </Text>
          <Text style={footerText}>
            <Link href="https://aspicrc.it/privacy" style={footerLink}>
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link href="mailto:info@aspicrc.it" style={footerLink}>
              Contatti
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AppointmentDateChange;

// ── STYLES ──
const body: React.CSSProperties = {
  backgroundColor: "#f5f5f7",
  fontFamily: "'DM Sans', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: "32px 0",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  maxWidth: "560px",
  margin: "0 auto",
  overflow: "hidden",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
};

const header: React.CSSProperties = {
  backgroundColor: "hsl(229,30%,14%)",
  padding: "28px 40px 24px",
  textAlign: "center",
};

const warningBar: React.CSSProperties = {
  backgroundColor: "hsl(38,92%,50%)",
  padding: "10px 40px",
  textAlign: "center",
};

const warningBarText: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#ffffff",
  margin: 0,
  letterSpacing: "0.03em",
};

const content: React.CSSProperties = {
  padding: "32px 40px",
};

const heading: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "26px",
  fontWeight: 400,
  color: "hsl(229,30%,14%)",
  lineHeight: 1.2,
  margin: "0 0 20px",
};

const headingEm: React.CSSProperties = {
  fontStyle: "italic",
  color: "hsl(38,92%,40%)",
};

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 300,
  lineHeight: 1.8,
  color: "#444444",
  margin: "0 0 14px",
};

const strong: React.CSSProperties = {
  fontWeight: 500,
  color: "hsl(229,30%,14%)",
};

const summaryCard: React.CSSProperties = {
  backgroundColor: "hsl(38,92%,97%)",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "24px 0",
};

const summaryTitle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "hsl(38,92%,35%)",
  margin: "0 0 12px",
};

const summaryDivider: React.CSSProperties = {
  borderColor: "hsl(38,92%,85%)",
  margin: "10px 0 12px",
};

const summaryRow: React.CSSProperties = {
  marginBottom: "8px",
};

const summaryLabel: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 300,
  color: "#777777",
  width: "140px",
  verticalAlign: "top",
  paddingRight: "12px",
};

const summaryValue: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 400,
  color: "hsl(229,30%,14%)",
};

const summaryValueMuted: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 400,
  color: "#999999",
};

const oldDateStyle: React.CSSProperties = {
  textDecoration: "line-through",
  color: "#aaaaaa",
};

const newDateStyle: React.CSSProperties = {
  fontWeight: 500,
  color: "hsl(152,52%,30%)",
};

const protocol: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: "12px",
  backgroundColor: "hsl(38,92%,88%)",
  color: "hsl(38,92%,35%)",
  padding: "2px 8px",
  borderRadius: "4px",
};

const ctaSection: React.CSSProperties = {
  margin: "24px 0",
};

const ctaColumnLeft: React.CSSProperties = {
  paddingRight: "6px",
};

const ctaColumnRight: React.CSSProperties = {
  paddingLeft: "6px",
};

const confirmButton: React.CSSProperties = {
  backgroundColor: "hsl(229,30%,14%)",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: 500,
  padding: "12px 16px",
  borderRadius: "10px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
};

const rejectButton: React.CSSProperties = {
  backgroundColor: "#ffffff",
  color: "hsl(0,72%,42%)",
  fontSize: "13px",
  fontWeight: 500,
  padding: "11px 16px",
  borderRadius: "10px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  border: "1px solid hsl(0,72%,42%)",
};

const warningNote: React.CSSProperties = {
  backgroundColor: "hsl(38,92%,97%)",
  border: "1px solid hsl(38,92%,85%)",
  borderRadius: "10px",
  padding: "10px 16px",
  margin: "0 0 24px",
};

const warningNoteText: React.CSSProperties = {
  fontSize: "12px",
  color: "hsl(38,92%,35%)",
  fontWeight: 400,
  margin: 0,
  lineHeight: 1.6,
};

const divider: React.CSSProperties = {
  borderColor: "hsl(0,0%,90%)",
  margin: "24px 0",
};

const smallNote: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 300,
  color: "#888888",
  lineHeight: 1.7,
  margin: 0,
};

const link: React.CSSProperties = {
  color: "hsl(229,54.2%,32.5%)",
  textDecoration: "underline",
};

const footer: React.CSSProperties = {
  backgroundColor: "hsl(0,0%,96%)",
  padding: "20px 40px",
  textAlign: "center",
  borderTop: "1px solid hsl(0,0%,90%)",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  color: "#aaaaaa",
  margin: "0 0 4px",
  fontWeight: 300,
};

const footerLink: React.CSSProperties = {
  color: "#aaaaaa",
  textDecoration: "underline",
};
