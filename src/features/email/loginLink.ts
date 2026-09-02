import type { EmailMessage } from './provider';
import { PALETTE, emailShell, emailButton } from './layout';

/** Correo de inicio de sesión sin contraseña: un enlace mágico de un solo uso y corta duración. */
export function loginLinkEmail(to: string, link: string, storeName: string): EmailMessage {
  const subject = `Iniciar sesión en ${storeName}`;
  const text = `Haz clic para iniciar sesión en ${storeName}:\n\n${link}\n\nEste enlace caduca en 15 minutos. Si no lo solicitaste, ignora este correo.`;
  const html = emailShell({
    storeName,
    heading: 'Iniciar sesión',
    subheading: 'Este enlace caduca en 15 minutos y solo puede usarse una vez.',
    body:
      emailButton(link, 'Iniciar sesión') +
      `<p style="margin:0;font-size:12px;line-height:1.6;color:${PALETTE.muted};">
        ¿No funciona el botón? Copia y pega esto en tu navegador:<br>
        <a href="${link}" style="color:${PALETTE.muted};word-break:break-all;">${link}</a>
      </p>`,
    footer: 'Si no solicitaste este correo, puedes ignorarlo sin problemas.',
  });
  return { to, subject, html, text };
}
