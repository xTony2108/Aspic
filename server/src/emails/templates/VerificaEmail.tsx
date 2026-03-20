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
  Img,
} from "@react-email/components";

interface VerificaEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  temporaryPassword: string;
  verificationUrl: string;
  createdByName?: string;
  expiresInHours?: number;
}

export const VerificaEmail = ({
  firstName = "Maria",
  lastName = "Rossi",
  email = "m.rossi@aspicrc.it",
  temporaryPassword = "Temp#2026!",
  verificationUrl = "https://aspicrc.it/admin/verifica?token=xxx",
  createdByName = "Amministrazione ASPIC",
  expiresInHours = 24,
}: VerificaEmailProps) => (
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
      Benvenuto in ASPIC Psicologia — Le tue credenziali di accesso
    </Preview>
    <Body style={body}>
      <Container style={container}>
        <Section style={header}>
          <Img
            src="http://localhost:5173/logo_aspic.svg"
            alt="ASPIC Psicologia"
            width={140}
            height="auto"
            style={{ margin: "0 auto", display: "block" }}
          />
          <Text style={headerSub}>Pannello Professionisti</Text>
        </Section>

        <Section style={iconSection}>
          <div style={iconCircle}>👤</div>
        </Section>

        <Section style={content}>
          <Heading style={heading}>
            Benvenuto/a nel team <span style={headingEm}>ASPIC</span>
          </Heading>

          <Text style={paragraph}>
            Ciao{" "}
            <strong style={strong}>
              {firstName} {lastName}
            </strong>
            ,
          </Text>
          <Text style={paragraph}>
            <strong style={strong}>{createdByName}</strong> ha creato un account
            professionista per te su ASPIC Psicologia Reggio Calabria. Trovi qui
            sotto le tue credenziali di accesso temporanee.
          </Text>

          <Section style={credentialsCard}>
            <Text style={credentialsTitle}>Le tue credenziali</Text>
            <Hr style={credentialsDivider} />
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={credLabelTd}>Email</td>
                  <td style={credValueTd}>{email}</td>
                </tr>
                <tr>
                  <td style={credLabelTd}>Password temporanea</td>
                  <td style={credValueTd}>
                    <span style={passwordBadge}>{temporaryPassword}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Section style={warnBox}>
            <Text style={warnText}>
              🔐 <strong>Importante:</strong> al primo accesso ti verrà
              richiesto di impostare una nuova password personale. La password
              temporanea non potrà essere riutilizzata.
            </Text>
          </Section>

          <Section style={buttonSection}>
            <Button style={button} href={verificationUrl}>
              Verifica email e accedi →
            </Button>
          </Section>

          <Text style={smallNote}>
            Il link è valido per{" "}
            <strong style={strong}>{expiresInHours} ore</strong>. Dopo tale
            termine contatta l'amministrazione per ricevere un nuovo link.
          </Text>

          <Hr style={divider} />

          <Text style={smallNote}>
            Se non ti aspettavi questa email o ritieni che sia un errore,
            ignorala oppure contatta{" "}
            <Link href="mailto:info@aspicrc.it" style={link}>
              info@aspicrc.it
            </Link>
            .
          </Text>

          <Section style={urlBlock}>
            <Text style={urlLabel}>Oppure copia questo link nel browser:</Text>
            <Link href={verificationUrl} style={urlLink}>
              {verificationUrl}
            </Link>
          </Section>
        </Section>

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

export default VerificaEmail;

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

const iconSection: React.CSSProperties = {
  textAlign: "center",
  padding: "32px 40px 0",
};

const iconCircle: React.CSSProperties = {
  display: "inline-block",
  width: "64px",
  height: "64px",
  lineHeight: "64px",
  borderRadius: "50%",
  backgroundColor: "hsl(229,40%,95%)",
  color: "hsl(229,54.2%,32.5%)",
  fontSize: "28px",
  textAlign: "center",
};

const content: React.CSSProperties = {
  padding: "28px 40px 32px",
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

const credentialsCard: React.CSSProperties = {
  backgroundColor: "hsl(229,45%,96%)",
  borderRadius: "12px",
  padding: "18px 22px",
  margin: "20px 0 14px",
};

const credentialsTitle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "hsl(229,54.2%,32.5%)",
  margin: "0 0 10px",
};

const credentialsDivider: React.CSSProperties = {
  borderColor: "hsl(229,40%,88%)",
  margin: "0 0 14px",
};

const credLabelTd: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 300,
  color: "#777777",
  paddingBottom: "10px",
  paddingRight: "16px",
  width: "160px",
  verticalAlign: "middle",
};

const credValueTd: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 400,
  color: "hsl(229,30%,14%)",
  paddingBottom: "10px",
  verticalAlign: "middle",
};

const passwordBadge: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: "14px",
  backgroundColor: "hsl(229,30%,14%)",
  color: "#ffffff",
  padding: "4px 12px",
  borderRadius: "6px",
  letterSpacing: "0.05em",
};

const warnBox: React.CSSProperties = {
  backgroundColor: "hsl(38,92%,94%)",
  border: "1px solid hsl(38,92%,78%)",
  borderRadius: "10px",
  padding: "12px 16px",
  margin: "0 0 20px",
};

const warnText: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 300,
  color: "hsl(38,50%,30%)",
  lineHeight: 1.7,
  margin: 0,
};

const buttonSection: React.CSSProperties = {
  textAlign: "center",
  margin: "24px 0 16px",
};

const button: React.CSSProperties = {
  backgroundColor: "hsl(229,54.2%,32.5%)",
  color: "#ffffff",
  borderRadius: "50px",
  padding: "14px 36px",
  fontSize: "15px",
  fontWeight: 500,
  textDecoration: "none",
  display: "inline-block",
  letterSpacing: "0.02em",
};

const smallNote: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 300,
  color: "#888888",
  lineHeight: 1.7,
  margin: "0 0 12px",
};

const divider: React.CSSProperties = {
  borderColor: "hsl(0,0%,90%)",
  margin: "24px 0",
};

const link: React.CSSProperties = {
  color: "hsl(229,54.2%,32.5%)",
  textDecoration: "underline",
};

const urlBlock: React.CSSProperties = {
  backgroundColor: "hsl(0,0%,96%)",
  borderRadius: "10px",
  padding: "14px 18px",
  marginTop: "16px",
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
