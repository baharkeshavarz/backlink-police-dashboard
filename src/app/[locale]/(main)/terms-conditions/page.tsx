import React, { FC } from "react";
import { Container, Typography, Box } from "@mui/material";

const TermsConditions = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4, bgcolor: "white" }}>
      <Typography variant="h4" gutterBottom>
        Terms and Conditions
      </Typography>

      <Box mt={3}>
        <Section title="1. Use of the Service">
          You agree to use the Service only for lawful purposes. You may not use
          it to post harmful, unlawful, or abusive content. Any misuse may
          result in suspension or termination of your account.
        </Section>

        <Section title="2. User-Generated Content">
          By posting content, you confirm you own or have permission to share
          it. You grant us a non-exclusive license to use the content to operate
          and promote the platform.
        </Section>

        <Section title="3. Privacy">
          Please review our Privacy Policy to understand how we collect, use,
          and protect your personal information.
        </Section>

        <Section title="4. Intellectual Property">
          All non-user content on this site is owned by us or our licensors and
          protected by intellectual property laws.
        </Section>

        <Section title="5. Termination">
          We reserve the right to terminate access to our Service for violation
          of these Terms.
        </Section>

        <Section title="6. Disclaimers">
          The Service is provided &quot;as is&quot; without warranties of any
          kind. We make no guarantees about the accuracy or availability of the
          platform.
        </Section>

        <Section title="7. Limitation of Liability">
          We are not liable for any indirect or consequential damages resulting
          from your use of the Service.
        </Section>

        <Section title="8. Changes to These Terms">
          We may update these Terms from time to time. Continued use of the
          Service means you accept the updated terms.
        </Section>

        <Section title="9. Contact Us">
          If you have questions about these Terms, please contact us at: <br />
          <strong>Email:</strong> support@test.com <br />
        </Section>
      </Box>
    </Container>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}
const Section: FC<SectionProps> = ({ title, children }) => (
  <Box mb={4}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" color="text.primary">
      {children}
    </Typography>
  </Box>
);

export default TermsConditions;
