#!/bin/bash

echo "Testing contact form endpoint..."
echo ""

response=$(curl -X POST https://backjennifer.roilabs.com.br/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste Lead Dashboard",
    "email": "teste.dashboard@example.com",
    "phone": "11987654321",
    "company": "Empresa Teste",
    "message": "Esta é uma mensagem de teste para verificar se os contatos aparecem no dashboard de leads."
  }' \
  -s -w "\nHTTP Status: %{http_code}\n")

echo "$response"
echo ""
echo "---"
echo "If status is 201, the contact was created successfully."
echo "Now check https://jbadmin.roilabs.com.br/leads to see if it appears."
