import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import {
  User,
  Category,
  Product,
  Supplier,
  Purchase,
  SupplierPayment,
  Client,
  Sale,
  StockMovement,
  DocumentTemplate,
  StoreSettings,
  ThemeSettings,
  SectionPermissions,
  AuditLog
} from '../types';

export interface DatabaseSchema {
  users: (User & { passwordHash: string })[];
  settings: StoreSettings;
  theme: ThemeSettings;
  permissions: SectionPermissions;
  documentTemplates: DocumentTemplate[];
  categories: Category[];
  products: Product[];
  suppliers: Supplier[];
  purchases: Purchase[];
  supplierPayments: SupplierPayment[];
  clients: Client[];
  sales: Sale[];
  stockMovements: StockMovement[];
  auditLogs: AuditLog[];
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'database.json');

// Default initial data
function getDefaultData(): DatabaseSchema {
  // Salt & Hash initial credentials
  // zitoune : 123456
  // DevAdam : Bixer15special@@@
  const salt = bcrypt.genSaltSync(10);
  const adminHash = bcrypt.hashSync('123456', salt);
  const devHash = bcrypt.hashSync('Bixer15special@@@', salt);

  const defaultUsers: (User & { passwordHash: string })[] = [
    {
      id: 'usr_admin',
      username: 'zitoune',
      name: 'M. Zitoune (Gérant)',
      role: 'admin',
      passwordHash: adminHash,
      createdAt: '2026-01-01T08:00:00Z',
    },
    {
      id: 'usr_dev',
      username: 'DevAdam',
      name: 'Adam (Développeur Principal)',
      role: 'developer',
      passwordHash: devHash,
      createdAt: '2026-01-01T08:00:00Z',
    }
  ];

  const defaultSettings: StoreSettings = {
    appName: 'Carrelage Arwa',
    businessName: 'CARRELAGE ARWA',
    logoUrl: '',
    address: 'Boulevard Ahmed Ben Hmad Dighoussi, 2 Bis Lot Ratbia Zitoune',
    phone: '0671152615',
    email: 'contact@carrelagearwa.ma',
    city: 'Meknes',
    country: 'Maroc',
    ice: '004027096000073',
    ifCode: '45892147',
    patente: '37920145',
    cnss: '7829410',
    rc: '341908 Meknes',
    currency: 'DH',
    numberFormatDecimals: 2,
    defaultLanguage: 'fr',
    receiptFooterLegalText: 'Les marchandises vendues ne seront ni reprises ni échangées et seront reconnues pour les clients avant leur acquisition.',
    defaultPaperSize: 'A5',
    defaultTvaRate: 20,
    allowNegativeStock: false,
    carrelagePolicy: 'exact_tile',
    nextBlNumber: 1,
    nextFactureNumber: 1,
    nextPurchaseNumber: 1,
  };

  const defaultTheme: ThemeSettings = {
    primaryColor: '#b45309', // Warm Moroccan terracotta / amber 700
    secondaryColor: '#0f172a',
    accentColor: '#d97706',
    sidebarBg: '#1e293b',
    sidebarText: '#f8fafc',
    headerBg: '#ffffff',
    fontFamily: 'Plus Jakarta Sans',
    borderRadius: 'rounded-lg',
    interfaceDensity: 'comfortable',
    isDarkMode: false,
  };

  const defaultPermissions: SectionPermissions = {
    dashboard: true,
    pos: true,
    products: true,
    categories: true,
    inventory: true,
    purchases: true,
    suppliers: true,
    supplierPayments: true,
    clients: true,
    invoices: true,
    deliveryNotes: true,
    reports: true,
    printConfig: true,
    settings: true,
  };

  const defaultTemplates: DocumentTemplate[] = [
    {
      id: 'tpl_bl',
      name: 'Bon de Livraison Standard A5',
      type: 'bon_livraison',
      title: 'BON DE LIVRAISON',
      paperSize: 'A5',
      orientation: 'portrait',
      marginsMm: 8,
      showLogo: true,
      showCompanyDetails: true,
      showClientBox: true,
      showPrices: true,
      showTaxDetails: false,
      showSignatures: true,
      signatureClientLabel: 'Accusé de réception client',
      signatureVendeurLabel: 'Pour CarrelageArwa',
      showLegalNotice: true,
      legalNoticeText: 'Les marchandises vendues ne seront ni reprises ni échangées et seront reconnues pour les clients avant leur acquisition.',
      columns: [
        { id: 'c1', key: 'designation', label: 'Désignation', visible: true, widthPercent: 44 },
        { id: 'c2', key: 'quantite', label: 'Quantité', visible: true, widthPercent: 12 },
        { id: 'c3', key: 'caisse', label: 'Caisse', visible: true, widthPercent: 11 },
        { id: 'c4', key: 'carreaux', label: 'Carreaux', visible: true, widthPercent: 11 },
        { id: 'c5', key: 'prixU', label: 'Prix U', visible: true, widthPercent: 11 },
        { id: 'c6', key: 'montant', label: 'Montant', visible: true, widthPercent: 11 },
      ],
      headerColor: '#b45309',
      tableHeaderBg: '#f1f5f9',
      fontSize: 10,
    },
    {
      id: 'tpl_facture',
      name: 'Facture Commerciale Standard A5',
      type: 'facture',
      title: 'FACTURE',
      paperSize: 'A5',
      orientation: 'portrait',
      marginsMm: 8,
      showLogo: true,
      showCompanyDetails: true,
      showClientBox: true,
      showPrices: true,
      showTaxDetails: true,
      showSignatures: true,
      signatureClientLabel: 'Visa & Bon pour accord Client',
      signatureVendeurLabel: 'La Direction',
      showLegalNotice: true,
      legalNoticeText: 'Les marchandises vendues ne seront ni reprises ni échangées et seront reconnues pour les clients avant leur acquisition.',
      columns: [
        { id: 'c1', key: 'designation', label: 'Désignation', visible: true, widthPercent: 44 },
        { id: 'c2', key: 'quantite', label: 'Quantité', visible: true, widthPercent: 12 },
        { id: 'c3', key: 'caisse', label: 'Caisse', visible: true, widthPercent: 11 },
        { id: 'c4', key: 'carreaux', label: 'Carreaux', visible: true, widthPercent: 11 },
        { id: 'c5', key: 'prixU', label: 'Prix U (DH)', visible: true, widthPercent: 11 },
        { id: 'c6', key: 'montant', label: 'Montant (DH)', visible: true, widthPercent: 11 },
      ],
      headerColor: '#0f172a',
      tableHeaderBg: '#f1f5f9',
      fontSize: 10,
    }
  ];

  const defaultCategories: Category[] = [];

  const defaultSuppliers: Supplier[] = [];
  const defaultProducts: Product[] = [];
  const defaultClients: Client[] = [];
  const defaultStockMovements: StockMovement[] = [];
  const defaultPurchases: Purchase[] = [];
  const defaultSales: Sale[] = [];
  const defaultSupplierPayments: SupplierPayment[] = [];

  const defaultAuditLogs: AuditLog[] = [
    {
      id: 'log_001',
      userId: 'usr_dev',
      userName: 'DevAdam',
      userRole: 'developer',
      action: 'SYSTEM_INITIALIZATION',
      entity: 'SYSTEM',
      details: 'Initialisation du système CarrelageArwa avec configuration initiale marocaine.',
      timestamp: '2026-01-01T08:00:00Z',
    }
  ];

  return {
    users: defaultUsers,
    settings: defaultSettings,
    theme: defaultTheme,
    permissions: defaultPermissions,
    documentTemplates: defaultTemplates,
    categories: defaultCategories,
    products: defaultProducts,
    suppliers: defaultSuppliers,
    purchases: defaultPurchases,
    supplierPayments: defaultSupplierPayments,
    clients: defaultClients,
    sales: defaultSales,
    stockMovements: defaultStockMovements,
    auditLogs: defaultAuditLogs,
  };
}

class Database {
  private data: DatabaseSchema;
  private isLoaded = false;

  constructor() {
    this.ensureDirExists();
    this.data = this.loadData();
  }

  private ensureDirExists() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    this.ensureDirExists();
    if (!fs.existsSync(DB_FILE)) {
      const defaultData = getDefaultData();
      this.saveToDisk(defaultData);
      this.isLoaded = true;
      return defaultData;
    }

    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      // Validate key entities exist
      const defaultData = getDefaultData();
      const merged: DatabaseSchema = {
        ...defaultData,
        ...parsed,
        settings: { ...defaultData.settings, ...(parsed.settings || {}) },
        theme: { ...defaultData.theme, ...(parsed.theme || {}) },
        permissions: { ...defaultData.permissions, ...(parsed.permissions || {}) },
        documentTemplates: parsed.documentTemplates?.length ? parsed.documentTemplates : defaultData.documentTemplates,
      };
      this.isLoaded = true;
      return merged;
    } catch (err) {
      console.error('Failed to parse database.json, initializing defaults:', err);
      const defaultData = getDefaultData();
      this.saveToDisk(defaultData);
      this.isLoaded = true;
      return defaultData;
    }
  }

  private saveToDisk(state: DatabaseSchema) {
    this.ensureDirExists();
    const tmpFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(state, null, 2), 'utf-8');
    fs.renameSync(tmpFile, DB_FILE);
  }

  public get<K extends keyof DatabaseSchema>(key: K): DatabaseSchema[K] {
    return JSON.parse(JSON.stringify(this.data[key]));
  }

  public set<K extends keyof DatabaseSchema>(key: K, value: DatabaseSchema[K]) {
    this.data[key] = JSON.parse(JSON.stringify(value));
    this.saveToDisk(this.data);
  }

  public transaction<T>(callback: (state: DatabaseSchema) => T): T {
    // Clone before mutation
    const snapshot = JSON.parse(JSON.stringify(this.data)) as DatabaseSchema;
    try {
      const result = callback(this.data);
      this.saveToDisk(this.data);
      return result;
    } catch (error) {
      // Rollback on error
      this.data = snapshot;
      throw error;
    }
  }

  public exportBackup(): string {
    return JSON.stringify(this.data, null, 2);
  }

  public importBackup(jsonString: string): boolean {
    const parsed = JSON.parse(jsonString) as DatabaseSchema;
    if (!parsed.users || !parsed.settings || !parsed.products) {
      throw new Error('Format de sauvegarde invalide');
    }
    this.data = parsed;
    this.saveToDisk(this.data);
    return true;
  }
}

export const db = new Database();
