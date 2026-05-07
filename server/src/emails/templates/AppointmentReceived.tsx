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

interface AppointmentReceivedProps {
  firstName: string;
  service: "valutazione-psicodiagnostica" | "consulenza-psicologica";
  date: string;
  time: string;
  clientType: "bambini" | "adulti" | "anziani";
  urgent?: boolean;
  protocolNumber?: string;
  appointmentMode: "online" | "in_person";
}

const AppointmentReceived = ({
  firstName = "Mario",
  service = "consulenza-psicologica",
  date = "25/03/2026",
  time = "10:00",
  clientType = "adulti",
  urgent = false,
  protocolNumber = "ASPIC-2026-0042",
  appointmentMode = "online",
}: AppointmentReceivedProps) => (
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
    <Preview>Richiesta ricevuta — ASPIC Psicologia Reggio Calabria</Preview>
    <Body style={body}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Img
            src="http://localhost:5173/logo_aspic.svg"
            alt="ASPIC Psicologia"
            width={140}
            height="auto"
            style={{ margin: "0 auto", display: "block" }}
          />
        </Section>

        {/* Green success bar */}
        <Section style={successBar}>
          <Text style={successBarText}>✓ Richiesta ricevuta con successo</Text>
        </Section>

        {/* Content */}
        <Section style={content}>
          <Heading style={heading}>
            La tua richiesta è <span style={headingEm}>in elaborazione</span>
          </Heading>

          <Text style={paragraph}>
            Ciao <strong style={strong}>{firstName}</strong>,
          </Text>
          <Text style={paragraph}>
            Abbiamo ricevuto la tua richiesta di appuntamento. Il nostro staff
            la prenderà in carico a breve e riceverai una seconda email con il
            link per procedere al pagamento e confermare definitivamente
            l'appuntamento.
          </Text>

          {urgent && (
            <Section style={urgentBadge}>
              <Text style={urgentText}>
                ⚡ Richiesta contrassegnata come urgente — verrà gestita con
                priorità
              </Text>
            </Section>
          )}

          {/* Riepilogo */}
          <Section style={summaryCard}>
            <Text style={summaryTitle}>Riepilogo richiesta</Text>
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
              <Column style={summaryLabel}>Data preferita</Column>
              <Column style={summaryValue}>{date}</Column>
            </Row>
            <Row style={summaryRow}>
              <Column style={summaryLabel}>Orario preferito</Column>
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

          {/* Steps */}
          <Text style={stepsTitle}>Cosa succede adesso</Text>

          <Section style={step}>
            <Row>
              <Column style={stepNum}>
                <span style={stepNumInner}>01</span>
              </Column>
              <Column style={stepBody}>
                <Text style={stepHeading}>Presa in carico</Text>
                <Text style={stepDesc}>
                  Un professionista valuterà la tua richiesta e la prenderà in
                  carico entro 24 ore lavorative.
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={step}>
            <Row>
              <Column style={stepNum}>
                <span style={stepNumInner}>02</span>
              </Column>
              <Column style={stepBody}>
                <Text style={stepHeading}>Email di pagamento</Text>
                <Text style={stepDesc}>
                  Riceverai una email con il link per procedere al pagamento in
                  modo sicuro e confermare l'appuntamento.
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={step}>
            <Row>
              <Column style={stepNum}>
                <span style={stepNumInner}>03</span>
              </Column>
              <Column style={stepBody}>
                <Text style={stepHeading}>Appuntamento confermato</Text>
                <Text style={stepDesc}>
                  Dopo il pagamento l'appuntamento sarà ufficialmente confermato
                  e riceverai tutti i dettagli.
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          <Text style={smallNote}>Dove trovarci</Text>
          <Text style={smallNote}>
            <a href="https://maps.app.goo.gl/BAWVuN624Fc6H8AY8" target="_blank">
              Via Missori, 7, 89127 Reggio Calabria RC
            </a>
          </Text>

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

export default AppointmentReceived;

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

const successBar: React.CSSProperties = {
  backgroundColor: "hsl(152,52%,36%)",
  padding: "10px 40px",
  textAlign: "center",
};

const successBarText: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#ffffff",
  margin: 0,
  letterSpacing: "0.03em",
};

const urgentBadge: React.CSSProperties = {
  backgroundColor: "hsl(38,92%,94%)",
  border: "1px solid hsl(38,92%,78%)",
  borderRadius: "10px",
  padding: "10px 16px",
  margin: "0 0 20px",
};

const urgentText: React.CSSProperties = {
  fontSize: "13px",
  color: "hsl(38,92%,30%)",
  fontWeight: 500,
  margin: 0,
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
  color: "hsl(229,54.2%,32.5%)",
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
  backgroundColor: "hsl(229,45%,96%)",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "24px 0",
};

const summaryTitle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "hsl(229,54.2%,32.5%)",
  margin: "0 0 12px",
};

const summaryDivider: React.CSSProperties = {
  borderColor: "hsl(229,40%,88%)",
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
  backgroundColor: "hsl(229,40%,88%)",
  color: "hsl(229,54.2%,32.5%)",
  padding: "2px 8px",
  borderRadius: "4px",
};

const divider: React.CSSProperties = {
  borderColor: "hsl(0,0%,90%)",
  margin: "24px 0",
};

const stepsTitle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#888888",
  margin: "0 0 16px",
};

const step: React.CSSProperties = {
  marginBottom: "14px",
};

const stepNum: React.CSSProperties = {
  width: "36px",
  verticalAlign: "top",
  paddingTop: "2px",
};

const stepNumInner: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: "18px",
  fontWeight: 400,
  color: "hsl(229,54.2%,32.5%)",
  opacity: 0.6,
};

const stepBody: React.CSSProperties = {
  verticalAlign: "top",
};

const stepHeading: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 500,
  color: "hsl(229,30%,14%)",
  margin: "0 0 3px",
};

const stepDesc: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 300,
  color: "#666666",
  lineHeight: 1.65,
  margin: 0,
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
