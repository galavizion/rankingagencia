import { useState, useEffect } from 'react';

const MOCK_MESSAGE = "Hola, busco cotización de un sistema contra incendios para una nave industrial de 3,000m², mi presupuesto es de como $120,000 MXN...";

export default function LeadSimulator() {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  // Data extraída (simulada)
  const [extractedData, setExtractedData] = useState({
    necesidad: null as string | null,
    tamano: null as string | null,
    presupuesto: null as string | null,
    estado: null as string | null
  });

  const typingSpeed = 40; // ms por carácter

  useEffect(() => {
    if (!hasStarted) return;

    if (typedText.length < MOCK_MESSAGE.length) {
      setIsTyping(true);
      const timeout = setTimeout(() => {
        setTypedText(MOCK_MESSAGE.substring(0, typedText.length + 1));
        
        // Simulación de extracción de datos
        const currentText = MOCK_MESSAGE.substring(0, typedText.length + 1).toLowerCase();
        
        setExtractedData(prev => ({
          ...prev,
          necesidad: currentText.includes('sistema contra incendios') ? 'Sistema contra incendios' : prev.necesidad,
          tamano: currentText.includes('3,000m²') || currentText.includes('3,000m2') ? '3,000 m²' : prev.tamano,
          presupuesto: currentText.includes('120,000') ? '$120,000 MXN' : prev.presupuesto,
          estado: currentText.includes('120,000') ? 'Altamente Calificado' : prev.estado,
        }));

      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      // Reiniciar después de unos segundos
      const resetTimeout = setTimeout(() => {
        setTypedText('');
        setExtractedData({
          necesidad: null,
          tamano: null,
          presupuesto: null,
          estado: null
        });
        setHasStarted(false);
        setTimeout(() => setHasStarted(true), 1000);
      }, 5000);
      return () => clearTimeout(resetTimeout);
    }
  }, [typedText, hasStarted]);

  useEffect(() => {
    const startDelay = setTimeout(() => setHasStarted(true), 1000);
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div style={styles.container}>
      {/* Columna Izquierda: WhatsApp Mockup */}
      <div style={styles.chatColumn}>
        <div style={styles.chatHeader}>
          <div style={styles.avatar}></div>
          <div>
            <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '14px' }}>Cliente Potencial</div>
            <div style={{ fontSize: '12px', color: '#d1d5db' }}>escribiendo...</div>
          </div>
        </div>
        <div style={styles.chatBody}>
          <div style={styles.chatBubble}>
            {typedText}
            {isTyping && <span className="anim-blink" style={styles.cursor}>|</span>}
          </div>
        </div>
        <div style={styles.chatFooter}>
          <div style={styles.chatInput}>Mensaje...</div>
          <div style={styles.sendBtn}>➤</div>
        </div>
      </div>

      {/* Columna Derecha: Backend/IA Mockup */}
      <div style={styles.backendColumn}>
        <div style={styles.backendHeader}>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>⚡ Supabase + gpt-4o-mini</span>
          <span className="anim-pulse" style={styles.pulse}>● live</span>
        </div>
        <div style={styles.backendBody}>
          <div style={{ marginBottom: '16px', fontSize: '12px', color: '#8b949e' }}>
            Extrayendo entidades en tiempo real...
          </div>
          
          <div style={styles.dataRow}>
            <span style={styles.dataLabel}>Necesidad:</span>
            {extractedData.necesidad ? (
              <span className="anim-fadeIn" style={styles.dataValueBadge}>{extractedData.necesidad} 🟢</span>
            ) : (
              <span style={styles.dataWaiting}>Esperando...</span>
            )}
          </div>
          
          <div style={styles.dataRow}>
            <span style={styles.dataLabel}>Tamaño:</span>
            {extractedData.tamano ? (
              <span className="anim-fadeIn" style={styles.dataValueBadge}>{extractedData.tamano} 🟢</span>
            ) : (
              <span style={styles.dataWaiting}>Esperando...</span>
            )}
          </div>
          
          <div style={styles.dataRow}>
            <span style={styles.dataLabel}>Presupuesto:</span>
            {extractedData.presupuesto ? (
              <span className="anim-fadeIn" style={styles.dataValueBadge}>{extractedData.presupuesto} 🟢</span>
            ) : (
              <span style={styles.dataWaiting}>Esperando...</span>
            )}
          </div>

          <div style={{...styles.dataRow, marginTop: '24px', borderTop: '1px solid #30363d', paddingTop: '16px'}}>
            <span style={styles.dataLabel}>Estado del Lead:</span>
            {extractedData.estado ? (
              <span className="anim-fadeIn" style={{...styles.dataValueBadge, background: 'rgba(255, 105, 0, 0.2)', color: '#ff6900', border: '1px solid rgba(255, 105, 0, 0.4)'}}>
                {extractedData.estado} 🔥
              </span>
            ) : (
              <span style={styles.dataWaiting}>Evaluando...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, import('react').CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    maxWidth: '900px',
    margin: '40px auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    flexWrap: 'wrap',
  },
  chatColumn: {
    flex: '1 1 350px',
    background: '#e5ddd5',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #d1d5db',
  },
  chatHeader: {
    background: '#075e54',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#ccc',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23fff\'%3E%3Cpath d=\'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-3.79 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\'/%3E%3C/svg%3E")',
    backgroundSize: '80%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  chatBody: {
    padding: '20px',
    flexGrow: 1,
    minHeight: '200px',
    backgroundImage: 'radial-gradient(#cfc6bc 1px, transparent 1px)',
    backgroundSize: '20px 20px',
  },
  chatBubble: {
    background: '#fff',
    padding: '12px 16px',
    borderRadius: '0 12px 12px 12px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    fontSize: '14px',
    lineHeight: '1.5',
    maxWidth: '90%',
    color: '#111',
    position: 'relative',
    display: 'inline-block',
  },
  cursor: {
    display: 'inline-block',
    marginLeft: '2px',
    fontWeight: 'bold',
  },
  chatFooter: {
    background: '#f0f0f0',
    padding: '10px 16px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  chatInput: {
    flexGrow: 1,
    background: '#fff',
    padding: '10px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#888',
  },
  sendBtn: {
    background: '#00a884',
    color: '#fff',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  },
  
  backendColumn: {
    flex: '1 1 350px',
    background: '#0d1117',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    color: '#c9d1d9',
    border: '1px solid #30363d',
  },
  backendHeader: {
    background: '#161b22',
    padding: '12px 20px',
    borderBottom: '1px solid #30363d',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pulse: {
    color: '#3fb950',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  backendBody: {
    padding: '24px 20px',
    flexGrow: 1,
  },
  dataRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '8px 0',
  },
  dataLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#8b949e',
  },
  dataValueBadge: {
    background: 'rgba(63, 185, 80, 0.1)',
    color: '#3fb950',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 'bold',
    border: '1px solid rgba(63, 185, 80, 0.4)',
  },
  dataWaiting: {
    fontSize: '13px',
    color: '#484f58',
    fontStyle: 'italic',
  }
};