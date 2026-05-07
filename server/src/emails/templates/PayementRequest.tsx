import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
  Link,
  Font,
  Preview,
  Row,
  Column,
  Img,
} from "@react-email/components";
import { getServiceLabel } from "../../utility/getLabels.js";

interface PayementRequestProps {
  firstName: string;
  service: "consulenza-psicologica" | "valutazione-psicodiagnostica";
  date: string;
  time: string;
  professionalName: string;
  amount: number;
  paymentUrl: string;
  paymentExpiresAt: string;
  protocolNumber?: string;
  appointmentMode: "online" | "in_person";
}

const PayementRequest = ({
  firstName = "Mario",
  service = "consulenza-psicologica",
  date = "25/03/2026",
  time = "10:00",
  professionalName = "Dott.ssa Maria Rossi",
  amount = 80,
  paymentUrl = "https://aspicrc.it/pagamento?token=xxx",
  paymentExpiresAt = "27/03/2026 alle 23:59",
  protocolNumber = "ASPIC-2026-0042",
  appointmentMode = "online",
}: PayementRequestProps) => (
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
      Completa il pagamento per confermare il tuo appuntamento — ASPIC
      Psicologia
    </Preview>
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

        {/* Amount hero */}
        <Section style={amountHero}>
          <Text style={amountLabel}>Importo da pagare</Text>
          <Text style={amountValue}>€ {amount.toFixed(2)}</Text>
          <Text style={amountService}>{getServiceLabel(service)}</Text>
        </Section>

        {/* Content */}
        <Section style={content}>
          <Heading style={heading}>
            Il tuo appuntamento è <span style={headingEm}>pronto</span>
          </Heading>

          <Text style={paragraph}>
            Ciao <strong style={strong}>{firstName}</strong>,
          </Text>
          <Text style={paragraph}>
            La tua richiesta è stata presa in carico da{" "}
            <strong style={strong}>{professionalName}</strong>. Per confermare
            definitivamente l'appuntamento, completa il pagamento entro il{" "}
            <strong style={strong}>{paymentExpiresAt}</strong>.
          </Text>

          {/* CTA */}
          <Section style={buttonSection}>
            <Button style={button} href={paymentUrl}>
              Completa il pagamento →
            </Button>
          </Section>

          <Text style={secureNote}>
            🔒 Pagamento sicuro — i tuoi dati sono protetti con crittografia SSL
          </Text>

          <Hr style={divider} />

          {/* Riepilogo appuntamento */}
          <Text style={sectionLabel}>Dettagli appuntamento</Text>

          <Section style={summaryCard}>
            <Row style={summaryRow}>
              <Column style={summaryLabelStyle}>Protocollo</Column>
              <Column style={summaryValue}>
                <span style={protocol}>{protocolNumber}</span>
              </Column>
            </Row>
            <Row style={summaryRow}>
              <Column style={summaryLabelStyle}>Servizio</Column>
              <Column style={summaryValue}>{getServiceLabel(service)}</Column>
            </Row>
            <Row style={summaryRow}>
              <Column style={summaryLabelStyle}>Data</Column>
              <Column style={summaryValue}>{date}</Column>
            </Row>
            <Row style={summaryRow}>
              <Column style={summaryLabelStyle}>Orario</Column>
              <Column style={summaryValue}>{time}</Column>
            </Row>
            <Row style={summaryRow}>
              <Column style={summaryLabelStyle}>Professionista</Column>
              <Column style={summaryValue}>{professionalName}</Column>
            </Row>
            <Row style={summaryRow}>
              <Column style={summaryLabelStyle}>Luogo</Column>
              <Column style={summaryValue}>
                {appointmentMode === "online" ? "Online" : "In studio"}
              </Column>
            </Row>

            <Hr style={{ borderColor: "hsl(229,40%,88%)", margin: "12px 0" }} />
            <Row>
              <Column style={{ ...summaryLabelStyle, fontWeight: 500 }}>
                Totale
              </Column>
              <Column
                style={{
                  ...summaryValue,
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "hsl(229,54.2%,32.5%)",
                }}
              >
                € {amount.toFixed(2)}
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Scadenza */}
          <Section style={expiryBox}>
            <Text style={expiryText}>
              ⏰ <strong>Attenzione:</strong> il link di pagamento scade il{" "}
              <strong>{paymentExpiresAt}</strong>. Dopo tale data sarà
              necessario contattarci per procedere con una nuova richiesta.
            </Text>
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
            Hai problemi con il pagamento? Contattaci a{" "}
            <Link href="mailto:info@aspicrc.it" style={link}>
              info@aspicrc.it
            </Link>{" "}
            indicando il numero di protocollo{" "}
            <strong style={strong}>{protocolNumber}</strong>.
          </Text>

          <Section style={urlBlock}>
            <Text style={urlLabel}>Oppure copia questo link nel browser:</Text>
            <Link href={paymentUrl} style={urlLink}>
              {paymentUrl}
            </Link>
          </Section>
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

export default PayementRequest;

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

const logoText: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "22px",
  fontWeight: 600,
  color: "#ffffff",
  margin: 0,
  letterSpacing: "0.02em",
};

const logoEm: React.CSSProperties = {
  fontStyle: "italic",
  color: "hsl(229,40%,82%)",
};

const headerSub: React.CSSProperties = {
  fontSize: "11px",
  color: "rgba(255,255,255,0.4)",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  margin: "4px 0 0",
};

const amountHero: React.CSSProperties = {
  background:
    "linear-gradient(135deg, hsl(229,54.2%,32.5%) 0%, hsl(229,40%,50%) 100%)",
  padding: "32px 40px",
  textAlign: "center",
};

const amountLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.6)",
  margin: "0 0 6px",
};

const amountValue: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: "48px",
  fontWeight: 400,
  color: "#ffffff",
  margin: "0 0 6px",
  lineHeight: 1,
};

const amountService: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 300,
  color: "rgba(255,255,255,0.7)",
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

const buttonSection: React.CSSProperties = {
  textAlign: "center",
  margin: "28px 0 12px",
};

const button: React.CSSProperties = {
  backgroundColor: "hsl(229,54.2%,32.5%)",
  color: "#ffffff",
  borderRadius: "50px",
  padding: "15px 40px",
  fontSize: "15px",
  fontWeight: 500,
  textDecoration: "none",
  display: "inline-block",
  letterSpacing: "0.02em",
};

const secureNote: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 300,
  color: "#aaaaaa",
  textAlign: "center",
  margin: "0 0 24px",
};

const divider: React.CSSProperties = {
  borderColor: "hsl(0,0%,90%)",
  margin: "24px 0",
};

const sectionLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#888888",
  margin: "0 0 14px",
};

const summaryCard: React.CSSProperties = {
  backgroundColor: "hsl(229,45%,96%)",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "0 0 24px",
};

const summaryRow: React.CSSProperties = {
  marginBottom: "10px",
};

const summaryLabelStyle: React.CSSProperties = {
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

const expiryBox: React.CSSProperties = {
  backgroundColor: "hsl(38,92%,94%)",
  border: "1px solid hsl(38,92%,78%)",
  borderRadius: "10px",
  padding: "12px 16px",
};

const expiryText: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 300,
  color: "hsl(38,50%,30%)",
  lineHeight: 1.7,
  margin: 0,
};

const smallNote: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 300,
  color: "#888888",
  lineHeight: 1.7,
  margin: "0 0 14px",
};

const link: React.CSSProperties = {
  color: "hsl(229,54.2%,32.5%)",
  textDecoration: "underline",
};

const urlBlock: React.CSSProperties = {
  backgroundColor: "hsl(0,0%,96%)",
  borderRadius: "10px",
  padding: "14px 18px",
};

const urlLabel: React.CSSProperties = {
  fontSize: "12px",
  color: "#888888",
  margin: "0 0 6px",
  fontWeight: 300,
};

const urlLink: React.CSSProperties = {
  fontSize: "12px",
  color: "hsl(229,54.2%,32.5%)",
  wordBreak: "break-all",
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
