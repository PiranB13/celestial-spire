/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  industry?: string
  budget?: string
  message?: string
}

const Email = ({ name, email, industry, budget, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact form submission from {name || 'someone'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New contact form submission</Heading>
        <Text style={text}>You received a new enquiry from your website.</Text>

        <Section style={card}>
          <Row label="Name" value={name} />
          <Row label="Email" value={email} />
          <Row label="Industry" value={industry} />
          <Row label="Budget" value={budget} />
        </Section>

        <Heading as="h2" style={h2}>Message</Heading>
        <Text style={messageBox}>{message || 'No message provided.'}</Text>

        <Hr style={hr} />
        <Text style={footer}>
          Reply directly to {email || 'the sender'} to respond.
        </Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label, value }: { label: string; value?: string }) => (
  <Text style={rowText}>
    <strong style={rowLabel}>{label}:</strong> {value || '—'}
  </Text>
)

export const template = {
  component: Email,
  subject: (data: Props) => `New enquiry from ${data?.name || 'website'}`,
  displayName: 'Contact form notification',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    industry: 'Hospitality',
    budget: '£500 – £1,000',
    message: 'Looking for a new website for my restaurant.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { color: '#0a0a0a', fontSize: '22px', margin: '0 0 12px' }
const h2 = { color: '#0a0a0a', fontSize: '16px', margin: '24px 0 8px' }
const text = { color: '#4a4a4a', fontSize: '14px', lineHeight: '22px', margin: '0 0 16px' }
const card = { background: '#f6f7f9', borderRadius: '8px', padding: '16px 18px', margin: '8px 0 16px' }
const rowText = { color: '#0a0a0a', fontSize: '14px', lineHeight: '22px', margin: '4px 0' }
const rowLabel = { color: '#0a0a0a' }
const messageBox = { color: '#0a0a0a', fontSize: '14px', lineHeight: '22px', background: '#f6f7f9', borderRadius: '8px', padding: '14px 16px', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: '#e5e7eb', margin: '24px 0 12px' }
const footer = { color: '#6b7280', fontSize: '12px', lineHeight: '18px', margin: 0 }
