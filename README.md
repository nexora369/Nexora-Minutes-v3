# NEXORA MINUTES

**Everyday Essentials. Delivered Fast.**

Hyperlocal single-vendor quick-commerce platform.

- Primary target: Char Aishordi Union
- Delivery promise: approximately 30–50 minutes
- Initial payment: Cash on Delivery
- Official brand colors: Red, White, Black
- Supporting semantic colors: Blue for payment/security, Green for success/savings, Yellow/Red for offers, Purple for premium

## Project status

**Phase 1 — Customer frontend foundation initialized.**

The current build includes a responsive customer homepage shell, search interaction, hot-category navigation, promotional sections, hot products, wishlist interaction, cart state and mobile bottom navigation.

## Roadmap

1. Product/category data layer
2. Product details + search/filter pages
3. Cart + checkout
4. Authentication
5. Orders + tracking
6. Protected admin panel
7. Inventory + delivery management
8. PostgreSQL backend/API
9. Coupons, offers, banners and reports
10. Security, SEO, testing and deployment

## Planned architecture

- Frontend: React / Next.js
- Backend: Node.js / API layer
- Database: PostgreSQL
- Authentication: secure role-based authentication
- Admin: protected admin dashboard
- Payments: COD first, gateway-ready architecture

## Local development

```bash
npm install
npm run dev
```

## Development rule

Keep customer frontend, backend services, database logic, and admin functionality modular. Do not put production credentials in frontend code. Server-side pricing and order totals will be authoritative once the backend is introduced.
