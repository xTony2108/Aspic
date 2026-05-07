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
} from "@react-email/components";
import {
  getClientTypeLabel,
  getServiceLabel,
} from "../../utility/getLabels.js";
import { config } from "../../config.js";

interface AppointmentCancelledProps {
  firstName: string;
  service: "valutazione-psicodiagnostica" | "consulenza-psicologica";
  date: string;
  time: string;
  clientType: "bambini" | "adulti" | "anziani";
  protocolNumber?: string;
  appointmentMode: "online" | "in_person";
}

const AppointmentCancelled = ({
  firstName = "Mario",
  service = "consulenza-psicologica",
  date = "25/03/2026",
  time = "10:00",
  clientType = "adulti",
  protocolNumber = "ASPIC-2026-0042",
  appointmentMode = "online",
}: AppointmentCancelledProps) => (
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
    <Preview>Appuntamento annullato — ASPIC Psicologia Reggio Calabria</Preview>
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

        {/* Red cancelled bar */}
        <Section style={cancelledBar}>
          <Text style={cancelledBarText}>✕ Appuntamento annullato</Text>
        </Section>

        {/* Content */}
        <Section style={content}>
          <Heading style={heading}>
            La tua richiesta è stata <span style={headingEm}>annullata</span>
          </Heading>

          <Text style={paragraph}>
            Ciao <strong style={strong}>{firstName}</strong>,
          </Text>
          <Text style={paragraph}>
            La tua richiesta di appuntamento è stata annullata dal nostro staff.
            Ci scusiamo per l'inconveniente. Se desideri, puoi effettuare una
            nuova prenotazione in qualsiasi momento.
          </Text>

          {/* Riepilogo */}
          <Section style={summaryCard}>
            <Text style={summaryTitle}>Riepilogo appuntamento annullato</Text>
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
              <Column style={summaryLabel}>Data</Column>
              <Column style={summaryValue}>{date}</Column>
            </Row>
            <Row style={summaryRow}>
              <Column style={summaryLabel}>Orario</Column>
              <Column style={summaryValue}>{time}</Column>
            </Row>
            <Row style={summaryRow}>
              <Column style={summaryLabel}>Tipo paziente</Column>
              <Column style={summaryValue}>
                {getClientTypeLabel(clientType)}
              </Column>
            </Row>
            <Row style={summaryRow}>
              <Column style={summaryLabel}>Luogo</Column>
              <Column style={summaryValue}>
                {appointmentMode === "online" ? "Online" : "In studio"}
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          <Text style={smallNote}>
            Per qualsiasi domanda o necessità puoi contattarci a{" "}
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

export default AppointmentCancelled;

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

const cancelledBar: React.CSSProperties = {
  backgroundColor: "hsl(0,72%,42%)",
  padding: "10px 40px",
  textAlign: "center",
};

const cancelledBarText: React.CSSProperties = {
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
  color: "hsl(0,72%,42%)",
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
  backgroundColor: "hsl(0,40%,96%)",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "24px 0",
};

const summaryTitle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "hsl(0,72%,42%)",
  margin: "0 0 12px",
};

const summaryDivider: React.CSSProperties = {
  borderColor: "hsl(0,40%,88%)",
  margin: "0 0 12px",
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

const protocol: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: "12px",
  backgroundColor: "hsl(0,40%,88%)",
  color: "hsl(0,72%,42%)",
  padding: "2px 8px",
  borderRadius: "4px",
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
