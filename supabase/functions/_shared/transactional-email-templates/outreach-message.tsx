/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  subject?: string
  body?: string
}

const Email = ({ subject, body }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{subject || 'A message from AI Web Solution'}</Preview>
    <Body style={main}>
      <Container style={container}>
        {(body || '').split('\n').map((line, i) => (
          <Text key={i} style={text}>{line || '\u00A0'}</Text>
        ))}
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Props) => data?.subject || 'Hello from AI Web Solution',
  displayName: 'Outreach message',
  previewData: {
    subject: 'Quick idea for your website',
    body: 'Hi there,\n\nI came across your business and had an idea I wanted to share...\n\nBest,\nPiran',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '600px', margin: '0 auto' }
const text = { color: '#0a0a0a', fontSize: '15px', lineHeight: '24px', margin: '0 0 12px' }
