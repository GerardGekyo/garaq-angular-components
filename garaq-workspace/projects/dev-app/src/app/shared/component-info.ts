export interface ComponentInfo {
  name: string;
  displayName: string;
  selector: string;
  description: string;
  category: 'General' | 'Forms' | 'Feedback' | 'Layout';
}

export const COMPONENT_REGISTRY: ComponentInfo[] = [
  // General
  { name: 'button', displayName: 'Button', selector: 'gc-button', description: 'Botón interactivo con múltiples variantes, tamaños y colores personalizables.', category: 'General' },
  { name: 'badge', displayName: 'Badge', selector: 'gc-badge', description: 'Etiqueta compacta para estados, categorías o contadores.', category: 'General' },
  { name: 'avatar', displayName: 'Avatar', selector: 'gc-avatar', description: 'Representación visual de un usuario con imagen o iniciales.', category: 'General' },
  { name: 'tooltip', displayName: 'Tooltip', selector: 'gc-tooltip', description: 'Información contextual que aparece al pasar el cursor.', category: 'General' },
  { name: 'spinner', displayName: 'Spinner', selector: 'gc-spinner', description: 'Indicador de carga con animaciones y contenido personalizable.', category: 'General' },
  { name: 'separator', displayName: 'Separator', selector: 'gc-separator', description: 'Línea divisora horizontal o vertical con etiqueta opcional.', category: 'General' },
  { name: 'shimmer', displayName: 'Shimmer', selector: 'gc-shimmer', description: 'Placeholder animado para estados de carga tipo skeleton.', category: 'General' },

  // Forms
  { name: 'input', displayName: 'Input', selector: 'gc-input', description: 'Campo de texto con label, descripción, prefijo/sufijo y validación.', category: 'Forms' },
  { name: 'textarea', displayName: 'Textarea', selector: 'gc-textarea', description: 'Campo de texto multilínea con contador de caracteres.', category: 'Forms' },
  { name: 'select', displayName: 'Select', selector: 'gc-select', description: 'Selector desplegable con opciones simples o con descripción.', category: 'Forms' },
  { name: 'combobox', displayName: 'Combobox', selector: 'gc-combobox', description: 'Selector con búsqueda, modo single o multiple, y tags.', category: 'Forms' },
  { name: 'checkbox', displayName: 'Checkbox', selector: 'gc-checkbox', description: 'Casilla de verificación con label, descripción y contenido rico.', category: 'Forms' },
  { name: 'switch-button', displayName: 'Switch', selector: 'gc-switch-button', description: 'Interruptor toggle para opciones on/off.', category: 'Forms' },
  { name: 'radio-button', displayName: 'Radio Button', selector: 'gc-radio-button', description: 'Botón de opción para selección exclusiva en grupo.', category: 'Forms' },

  // Feedback
  { name: 'alert', displayName: 'Alert', selector: 'gc-alert', description: 'Mensaje destacado para información, éxito, advertencia o error.', category: 'Feedback' },
  { name: 'toast', displayName: 'Toast', selector: 'gc-toast', description: 'Notificación temporal via servicio o inline.', category: 'Feedback' },
  { name: 'dialog', displayName: 'Dialog', selector: 'gc-dialog', description: 'Ventana modal para confirmaciones y contenido focalizado.', category: 'Feedback' },

  // Layout
  { name: 'card', displayName: 'Card', selector: 'gc-card', description: 'Contenedor con variantes, media full-bleed, header y footer.', category: 'Layout' },
  { name: 'tabs', displayName: 'Tabs', selector: 'gc-tabs', description: 'Navegación por pestañas con soporte de teclado completo.', category: 'Layout' },
];

export const CATEGORIES = ['General', 'Forms', 'Feedback', 'Layout'] as const;

export function getComponentsByCategory(category: string): ComponentInfo[] {
  return COMPONENT_REGISTRY.filter(c => c.category === category);
}

export interface ExampleInfo {
  name: string;
  displayName: string;
  description: string;
}

export const EXAMPLE_REGISTRY: ExampleInfo[] = [
  { name: 'login', displayName: 'Login', description: 'Formulario de inicio de sesión con email, contraseña, social login y estados de error.' },
  { name: 'register', displayName: 'Register', description: 'Formulario de registro multi-paso con perfil, tipo de cuenta, newsletter y validación.' },
];
