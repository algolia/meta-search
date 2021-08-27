export type MetaSearchAppDetailsItem = {
  applicationID: string;
  name: string;
  createdAt: Date;
  securityContactEmails: any[];
  logRegion: string;
  customAnalyticsRetentionDays: number;
  completedIndexConfigurationAt: Date;
  selectedOnboardingType: null;
  owner: Owner;
  isCollaborator: boolean;
  currentNumberTeamMembers: number;
  productionIndices: string[];
  reloginRequired: boolean;
  searchAPIKey: string;
  writeAPIKey: string;
  adminAPIKey: string;
  analyticsAPIKey: string;
  recommendationAPIKey: string;
  usageAPIKey: string;
  monitoringAPIKey: string;
  offlineVersion: number;
  clusters: Cluster[];
  multicluster: boolean;
  replicas: Cluster[];
  clusterHosts: string[];
  mainRegion: string;
  firstPaymentDate: Date;
  currentAppMonth: string;
  dns: DNS;
  chargeable: boolean;
  hasPendingCharge: boolean;
  planCanBeChanged: boolean;
  currentUserCanEnableAIRecommendation: boolean;
  hasAIRecommendationBeta: boolean;
  hasAcceptedAIRecommendationTerms: boolean;
  plan: Plan;
  futurePlan: null;
  blockOverquota: boolean;
  canChooseLegacyPlan: boolean;
  firstDayOfPlan: boolean;
  replicasFrozen: boolean;
  free: boolean;
  trial: boolean;
  trialEndsOn: Date;
  currentUserIsOwner: boolean;
  hasMultiApplicationsSetup: boolean;
  acls: string[];
  mainClusterName: string;
  pendingAPIKeysGeneration: boolean;
  acceptedPersonalization: Date;
  hasZendeskCrawlers: boolean;
  analyticsV2Access: boolean;
  enrollingToAnalytics: boolean;
  shopify: boolean;
  zuoraEnabled: boolean;
  deletable: boolean;
  deletingRequiresFeedback: boolean;
  lastInsightsActivityOn: null;
  readonly: boolean;
  applicationType: string;
};

type Cluster = {
  name: string;
  hosts: string[];
  region: string;
  regionName: string;
};

type DNS = {
  shouldBePropagated: boolean;
  propagatedFirst: boolean;
  propagatedSecond: boolean;
};

type Owner = {
  email: string;
  name: string;
  persona: null;
};

type Plan = {
  priceCents: number;
  priceYearlyCents: number;
  discount: number;
  currency: string;
  currentExchangeRate: number;
  name: string;
  label: string;
  version: number;
  renewalDate: Date;
  renewalDay: number;
  analyticsRetentionDays: number;
  analyticsDashboard: boolean;
  analyticsResults: boolean;
  analyticsAdvanced: boolean;
  analyticsAPI: boolean;
  teamMembers: number;
  firstDayOfPlan: boolean;
  remainingDays: number;
  currentBillingMonthStartDate: Date;
  daysSinceStartOfPlanMonth: number;
  additionalOperationsType: string;
  hasQueryRules: boolean;
  hasClickAnalytics: boolean;
  allowOptionalFiltersInRules: boolean;
  includedRules: number;
  hasCombinedUsageUnits: boolean;
  includedCombinedUsageUnits: number;
  totalIncludedCombinedUsageUnits: number;
  payAsYouGo: boolean;
  hasIndicesSizeQuota: boolean;
  dsnFormula: string;
  dsnBasePricePercent: null;
  dsnUpgradable: boolean;
  premiumSla: boolean;
  premiumSlaBasePricePercent: null;
  premiumSupport: boolean;
  premiumSupportBasePricePercent: null;
  usageAPI: boolean;
  monitoringAPI: boolean;
  dedicatedInfrastructure: boolean;
  usedSearchCapacity: boolean;
  commitment: number;
  selfServe: boolean;
  indexing: boolean;
  indexCreate: boolean;
  indexCreateReplica: boolean;
  indexCopy: boolean;
  indexRename: boolean;
  indexOnboarding: boolean;
  indexSynonyms: boolean;
  recordsAddManually: boolean;
  recordsAddFromFile: boolean;
  recordsAddFromAPI: boolean;
  adminAPIKeyDisplay: boolean;
  rulesVisualEditor: boolean;
  rulesManualEditor: boolean;
  recordSizeThresholds: RecordSizeThresholds;
  rulesMaxPromotedPosition: number;
  abTesting: boolean;
  aiRecommendation: boolean;
  clickAnalytics: boolean;
  crawler: boolean;
  docsearch: boolean;
  dsn: boolean;
  dynamicSynonymsSuggestions: boolean;
  extensionSupport: boolean;
  nluEnabled: boolean;
  personalization: boolean;
  querySuggestions: boolean;
  reranking: boolean;
  selfServeSso: boolean;
  supportEmail: boolean;
  team: boolean;
  teamAcls: boolean;
  usageReport: boolean;
  virtualReplica: boolean;
  includedRecords: number;
  totalIncludedRecordsHistory: TotalIncludedRecordsHistory[];
  includedOperations: number;
  includedSynonyms: number;
  includedMaxQps: null;
  additionalRecordsUnit: number;
  additionalRecordsUnitPriceCents: number;
  additionalOperationsUnit: number;
  additionalOperationsUnitPriceCents: number;
  includedIndicesSizeGigabytes: number;
  freePlanAcknowledgement: boolean;
};

type RecordSizeThresholds = {
  healthy: number;
  large: number;
  max: number;
};

type TotalIncludedRecordsHistory = {
  t: number;
  v: number;
};
