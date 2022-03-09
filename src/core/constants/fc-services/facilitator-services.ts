import { ServiceType } from '@enums';
import { SLUG_TO_READABLE_DETAILED_NAME_MAP, SLUG_TO_READABLE_NAME_MAP } from './slug-readble-name-map';

export const FACILITATOR_SERVICES = [
    {
        name: 'support_facilitator',
        slug: ServiceType.SUPPORTING,
        en: SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.SUPPORTING] || '',
        enShort: SLUG_TO_READABLE_NAME_MAP[ServiceType.SUPPORTING] || '',
    },
    {
        name: 'onboard_estates',
        slug: ServiceType.ONBOARDING,
        en: SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.ONBOARDING] || '',
        enShort: SLUG_TO_READABLE_NAME_MAP[ServiceType.ONBOARDING] || '',
    },
    {
        name: 'branding-estates',
        slug: ServiceType.BRANDING,
        en: SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.BRANDING] || '',
        enShort: SLUG_TO_READABLE_NAME_MAP[ServiceType.BRANDING] || '',
    },
    {
        name: 'milling_service',
        slug: ServiceType.MILLING,
        en: SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.MILLING] || '',
        enShort: SLUG_TO_READABLE_NAME_MAP[ServiceType.MILLING] || '',
    },
    {
        name: 'cupping_service',
        slug: ServiceType.CUPPING,
        en: SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.CUPPING] || '',
        enShort: SLUG_TO_READABLE_NAME_MAP[ServiceType.CUPPING] || '',
    },
    {
        name: 'import-delivery',
        slug: ServiceType.IMPORT,
        en: SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.IMPORT] || '',
        enShort: SLUG_TO_READABLE_NAME_MAP[ServiceType.IMPORT] || '',
    },
    {
        name: 'code-of-conduct-estates',
        slug: ServiceType.COC,
        en: SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.COC] || '',
        enShort: SLUG_TO_READABLE_NAME_MAP[ServiceType.COC] || '',
    },
    {
        name: 'exporter_service',
        slug: ServiceType.EXPORTER,
        en: SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.EXPORTER] || '',
        enShort: SLUG_TO_READABLE_NAME_MAP[ServiceType.EXPORTER] || '',
    },
    {
        name: 'sample-shipment',
        slug: ServiceType.SAMPLESHIPMENT,
        en: SLUG_TO_READABLE_DETAILED_NAME_MAP[ServiceType.SAMPLESHIPMENT] || '',
        enShort: SLUG_TO_READABLE_NAME_MAP[ServiceType.SAMPLESHIPMENT] || '',
    },
];

export const FACILITATOR_REQUEST = [
    {
        title: 'Not assigned',
        value: 'INITIATED',
    },
    {
        title: 'In Progress',
        value: 'IN_PROGRESS',
    },
    {
        title: 'Marked as complete',
        value: 'COMPLETED',
    },
    {
        title: 'Completed',
        value: 'CLOSED',
    },
];
