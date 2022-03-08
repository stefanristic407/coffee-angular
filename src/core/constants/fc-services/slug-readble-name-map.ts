import { ServiceType } from '@enums';

const SLUG_TO_READABLE_NAME_MAP: { [key in ServiceType]: string } = {} as { [key in ServiceType]: string };

SLUG_TO_READABLE_NAME_MAP[ServiceType.BRANDING] = 'Branding estates';
SLUG_TO_READABLE_NAME_MAP[ServiceType.COC] = 'Code of conduct estates';
SLUG_TO_READABLE_NAME_MAP[ServiceType.CUPPING] = 'Cupping';
SLUG_TO_READABLE_NAME_MAP[ServiceType.EXPORTER] = 'Exporter';
SLUG_TO_READABLE_NAME_MAP[ServiceType.IMPORT] = 'Import delivery';
SLUG_TO_READABLE_NAME_MAP[ServiceType.ONBOARDING] = 'Onboarding estates';
SLUG_TO_READABLE_NAME_MAP[ServiceType.MILLING] = 'Milling';
SLUG_TO_READABLE_NAME_MAP[ServiceType.SAMPLESHIPMENT] = 'Sample shipment';
SLUG_TO_READABLE_NAME_MAP[ServiceType.SUPPORTING] = 'Supporting facilitator';

const SLUG_TO_READABLE_DETAILED_NAME_MAP: { [key in ServiceType]: string } = {} as { [key in ServiceType]: string };
SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.BRANDING] = 'Branding & story creation';
SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.COC] = 'Code of conduct audit';
SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.CUPPING] = 'Cupping service';
SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.EXPORTER] = 'Exporter service';
SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.IMPORT] = 'Import & delivery service';
SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.ONBOARDING] = 'Onboarding estates';
SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.MILLING] = 'Milling service';
SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.SAMPLESHIPMENT] = 'Sample shipment service';
SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.SUPPORTING] = 'Supporting facilitator';

export { SLUG_TO_READABLE_NAME_MAP, SLUG_TO_READABLE_DETAILED_NAME_MAP };
