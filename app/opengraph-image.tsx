import { ImageResponse } from 'next/og'

export const alt = "L'Atelier d'Amande — Prothésiste Ongulaire à Marcellaz, Haute-Savoie"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a0f0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, "Times New Roman", serif',
          position: 'relative',
        }}
      >
        {/* Warm radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '900px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(176,128,96,0.11) 0%, transparent 70%)',
          }}
        />

        {/* Outer border frame */}
        <div
          style={{
            position: 'absolute',
            inset: '36px',
            border: '1px solid rgba(176,128,96,0.22)',
            borderRadius: '16px',
          }}
        />

        {/* Corner accents — top left */}
        <div style={{ position: 'absolute', top: '56px', left: '56px', width: '36px', height: '36px', borderTop: '1px solid rgba(176,128,96,0.55)', borderLeft: '1px solid rgba(176,128,96,0.55)' }} />
        {/* Corner accents — top right */}
        <div style={{ position: 'absolute', top: '56px', right: '56px', width: '36px', height: '36px', borderTop: '1px solid rgba(176,128,96,0.55)', borderRight: '1px solid rgba(176,128,96,0.55)' }} />
        {/* Corner accents — bottom left */}
        <div style={{ position: 'absolute', bottom: '56px', left: '56px', width: '36px', height: '36px', borderBottom: '1px solid rgba(176,128,96,0.55)', borderLeft: '1px solid rgba(176,128,96,0.55)' }} />
        {/* Corner accents — bottom right */}
        <div style={{ position: 'absolute', bottom: '56px', right: '56px', width: '36px', height: '36px', borderBottom: '1px solid rgba(176,128,96,0.55)', borderRight: '1px solid rgba(176,128,96,0.55)' }} />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Monogram */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(176,128,96,0.12)',
              border: '1px solid rgba(176,128,96,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '30px',
            }}
          >
            <span style={{ fontSize: '38px', color: '#C4956A', fontStyle: 'italic' }}>A</span>
          </div>

          {/* Brand name */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 400,
              color: '#F5EFE8',
              letterSpacing: '-0.025em',
              textAlign: 'center',
              lineHeight: 1.1,
              marginBottom: '22px',
            }}
          >
            {"L'Atelier d'Amande"}
          </div>

          {/* Separator */}
          <div
            style={{
              width: '72px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(176,128,96,0.7), transparent)',
              marginBottom: '22px',
            }}
          />

          {/* Location */}
          <div
            style={{
              fontSize: '22px',
              color: 'rgba(245,239,232,0.52)',
              fontStyle: 'italic',
              textAlign: 'center',
              letterSpacing: '0.01em',
              marginBottom: '26px',
            }}
          >
            Prothésiste Ongulaire · Marcellaz, Haute-Savoie
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '16px', color: '#C4956A', letterSpacing: '2px' }}>
              5,0 / 5
            </span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.36)' }}>
              · Google
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
