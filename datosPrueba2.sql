TRUNCATE TABLE "recipe_product_resources" CASCADE;
TRUNCATE TABLE "resources" CASCADE;
TRUNCATE TABLE "products" CASCADE;
TRUNCATE TABLE "suppliers" CASCADE;

INSERT INTO "suppliers" ("id", "ruc", "suplier_name", "contact_name", "email", "phone", "address", "createdAt", "updatedAt") VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 12345678901, 'Supplier Co.', 'John Doe', 'supplier@example.com', 987654321, '123 Main St', NOW(), NOW()),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 98765432109, 'Plastic Works Ltd.', 'Jane Smith', 'plastic@example.com', 123456789, '456 Elm St', NOW(), NOW()),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 45678912345, 'Cocoa Supplier Inc.', 'Alice Brown', 'cocoa@example.com', 456123789, '789 Oak St', NOW(), NOW());

INSERT INTO "categories" ("id", "name", "description", "createdAt", "updatedAt") VALUES
('33333333-3333-3333-3333-333333333333', 'Desserts', 'Sweet baked goods and treats', NOW(), NOW());

INSERT INTO "products" ("id", "name", "category_id", "price", "description", "imagen_url", "createdAt", "updatedAt") VALUES
('44444444-4444-4444-4444-444444444444', 'Cake', '33333333-3333-3333-3333-333333333333', 20.00, 'Delicious chocolate cake', 'https://example.com/cake.jpg', NOW(), NOW()),
('55555555-5555-5555-5555-555555555555', 'Cookies', '33333333-3333-3333-3333-333333333333', 10.00, 'Crunchy cookies', 'https://example.com/cookies.jpg', NOW(), NOW()),
('66666666-6666-6666-6666-666666666666', 'Brownies', '33333333-3333-3333-3333-333333333333', 15.00, 'Chewy chocolate brownies', 'https://example.com/brownies.jpg', NOW(), NOW());

INSERT INTO "resources" ("id", "name", "unit_price", "total_cost", "type_unit", "supplier_id", "purchase_date", "createdAt", "updatedAt", "observation") VALUES
('11111111-1111-1111-1111-111111111112', 'Flour', 25.00, 50.00, 'kg', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2025-01-01', NOW(), NOW(), 'Used for baking'),
('22222222-2222-2222-2222-222222222223', 'Sugar', 15.00, 30.00, 'kg', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '2025-01-02', NOW(), NOW(), 'Sweetener for recipes'),
('33333333-3333-3333-3333-333333333334', 'Butter', 50.00, 100.00, 'kg', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '2025-01-03', NOW(), NOW(), 'Used for pastries');

-- Datos de prueba para la tabla "recipe_product_resources"
INSERT INTO "recipe_product_resources" ("id", "product_id", "quantity_required", "unit", "createdAt", "updatedAt") VALUES
('44444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', '2', 'kg', NOW(), NOW()), -- Cake
('55555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', '1', 'kg', NOW(), NOW()), -- Cookies
('66666666-6666-6666-6666-666666666666', '66666666-6666-6666-6666-666666666666', '3', 'kg', NOW(), NOW()); -- Brownies

INSERT INTO "recipe_product_conexions" ("recipe_id", "resource_id", "createdAt", "updatedAt") VALUES
('44444444-4444-4444-4444-444444444444','11111111-1111-1111-1111-111111111112', NOW(), NOW()), -- Cake
('44444444-4444-4444-4444-444444444444','22222222-2222-2222-2222-222222222223', NOW(), NOW()),
('44444444-4444-4444-4444-444444444444','33333333-3333-3333-3333-333333333334', NOW(), NOW()), -- Cake
('55555555-5555-5555-5555-555555555555','11111111-1111-1111-1111-111111111112', NOW(), NOW()), -- Cookies
('55555555-5555-5555-5555-555555555555','22222222-2222-2222-2222-222222222223', NOW(), NOW()), -- Cookies
('55555555-5555-5555-5555-555555555555','33333333-3333-3333-3333-333333333334', NOW(), NOW()), -- Cookies
('66666666-6666-6666-6666-666666666666','11111111-1111-1111-1111-111111111112', NOW(), NOW()), -- Brownies
('66666666-6666-6666-6666-666666666666','22222222-2222-2222-2222-222222222223', NOW(), NOW()),
('66666666-6666-6666-6666-666666666666','33333333-3333-3333-3333-333333333334', NOW(), NOW()); -- Brownies

INSERT INTO "plant_production" ("id", "plant_name", "address", "createdAt", "updatedAt") VALUES
('77777777-7777-7777-7777-777777777777', 'Main Plant', '123 Factory Rd', NOW(), NOW()),
('88888888-8888-8888-8888-888888888888', 'Secondary Plant', '456 Industrial Ave', NOW(), NOW());
