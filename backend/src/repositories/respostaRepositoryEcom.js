import { pool } from '../db.js';

const TAMANHO_LOTE = 500;

export async function inserirRespostasEcomEmLote(respostas) {
  if (!Array.isArray(respostas)) {
    throw new TypeError('As respostas devem ser um array.');
  }

  if (respostas.length === 0) {
    return {
      inseridas: 0,
    };
  }

  let inseridas = 0;

  for (let inicio = 0; inicio < respostas.length; inicio += TAMANHO_LOTE) {
    const lote = respostas.slice(inicio, inicio + TAMANHO_LOTE);
    const valores = [];

    const placeholders = lote.map((resposta, indice) => {
      const offset = indice * 20;

      valores.push(
        resposta.orderid,
        resposta.name,
        resposta.email,
        resposta.date,
        resposta.store,
        resposta.delivery,
        resposta.coupon,
        resposta.nps,
        resposta.detmacro,
        resposta.det_atendimento,
        resposta.det_pagamento,
        resposta.det_siteapp,
        resposta.det_retirada,
        resposta.det_entrega,
        resposta.det_preco,
        resposta.det_produto,
        resposta.det_justif,
        resposta.tags,
        resposta.neut_prom_macro,
        resposta.neut_prom_justif,
      );

      return `(${Array.from(
        { length: 20 },
        (_, i) => `$${offset + i + 1}`,
      ).join(', ')})`;
    });

    const sql = `
      INSERT INTO public.npsecom (
        orderid,
        name,
        email,
        date,
        store,
        delivery,
        coupon,
        nps,
        detmacro,
        det_atendimento,
        det_pagamento,
        det_siteapp,
        det_retirada,
        det_entrega,
        det_preco,
        det_produto,
        det_justif,
        tags,
        neut_prom_macro,
        neut_prom_justif
      )
      VALUES ${placeholders.join(', ')}
      ON CONFLICT (orderid) DO NOTHING;
    `;

    const resultado = await pool.query(sql, valores);
    inseridas += resultado.rowCount;
  }

  return {
    inseridas,
  };
}
