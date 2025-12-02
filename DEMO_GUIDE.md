
# LegalMeet - Guía de Demo para Inversionistas

Esta guía describe el flujo narrativo para presentar el MVP de LegalMeet, destacando la simplicidad, la confianza y la consistencia de los datos.

## Guion de Demo (6 Pasos)

1.  **Ingreso y Seguridad (Login)**
    *   *Acción:* Iniciar en la pantalla de Login. Mostrar que es limpio y profesional.
    *   *Narrativa:* "LegalMeet es una plataforma cerrada. Entramos con las credenciales de 'Camila Vargas', una comerciante local."
    *   *Click:* Botón "Ingresar".

2.  **Dashboard y Asistente de Admisión**
    *   *Acción:* Aterrizar en el Dashboard. Destacar el bloque "Expón tu caso".
    *   *Narrativa:* "Lo primero que ve Camila no es un menú complejo, sino una pregunta simple: ¿Qué te pasa? Ella escribe su problema sobre una deuda."
    *   *Click:* Escribir texto de ejemplo y seleccionar categoría "Comercial". Click en "Analizar mi caso".

3.  **Match Inteligente (Buscar Abogado)**
    *   *Acción:* Mostrar la pantalla de resultados filtrados.
    *   *Narrativa:* "El sistema ya entendió que es un caso comercial. Le sugiere al Dr. Jorge Rodríguez, experto en Pymes. Nótese que la búsqueda ya está contextualizada."
    *   *Click:* Botón "Agendar" en la tarjeta del Dr. Jorge.

4.  **Vinculación del Caso**
    *   *Acción:* (Simulada por alerta en demo) Confirmar la cita.
    *   *Narrativa:* "Al agendar, no es una cita suelta. El sistema crea el 'Expediente' automáticamente y vincula esta cita al caso de la deuda."

5.  **Gestión en 'Mis Casos'**
    *   *Acción:* Navegar a 'Mis Casos'.
    *   *Narrativa:* "Aquí Camila ve su caso 'Deuda Proveedor' activo. Ve el progreso (45%), ve que el Dr. Jorge está asignado y ve la próxima acción. Todo en un lenguaje que ella entiende, no 'Autos' ni 'Radicados'."

6.  **Soporte y Cierre**
    *   *Acción:* Ir a 'Ayuda', mostrar el chat IA (si hay API Key) o las FAQ. Luego, ir al menú de usuario en el Header y cerrar sesión.
    *   *Narrativa:* "Si tiene dudas, el asistente siempre está ahí. Y cuando termina, sus datos quedan seguros."

---

## Guía de Estilo Rápida

### Paleta de Colores
*   **Brand (Confianza):** `bg-brand-800` (#115e59) - Verde Petróleo. Usado en Headers, Sidebar activo, botones secundarios fuertes.
*   **Action (Conversión):** `bg-action-600` (#4f46e5) - Índigo/Violeta. Usado exclusivamente para "Agendar", "Crear Caso", "Buscar".
*   **Backgrounds:** `bg-slate-50` para fondos generales (reduce fatiga visual), `bg-white` para tarjetas (contenido).
*   **Alertas:** Amarillo para "Borradores", Verde para "Disponibilidad/Confirmado", Rojo para "Notificaciones".

### Tipografía
*   **Familia:** Inter (Google Fonts). Sans-serif moderna, alta legibilidad en pantallas pobres.
*   **Jerarquía:**
    *   H1 (Títulos de página): Bold, Slate-800.
    *   H2 (Títulos de tarjeta): Bold, Slate-900.
    *   Cuerpo: Regular, Slate-600.
    *   Microcopy (Ayuda): Small, Slate-500.

### Elementos UI
*   **Tarjetas:** Bordes suaves (`border-slate-200`), sombras ligeras (`shadow-sm`), esquinas redondeadas (`rounded-xl`).
*   **Botones:**
    *   Primario: Sólido, color Action o Brand, texto blanco, feedback visual al hover.
    *   Secundario: Borde (Outline), fondo blanco.
*   **Inputs:** Grandes, padding generoso (fácil de tocar en móvil), focus ring claro para accesibilidad.
