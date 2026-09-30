'use client';

import React from 'react';
import { 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  History, 
  Calendar,
  AlertCircle,
  PlayCircle,
  FileSignature,
  XCircle,
  UserCheck
} from 'lucide-react';
import { StatusHistoryEntry, ClientContract } from '@/lib/contracts';

interface ContractTimelineProps {
  history?: StatusHistoryEntry[];
  currentStatus: ClientContract['status'];
}

export function ContractTimeline({ history = [], currentStatus }: ContractTimelineProps) {
  if (!history || history.length === 0) {
    return (
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center py-6">
        <History className="w-6 h-6 text-slate-500 mx-auto mb-2 opacity-60" />
        <p className="text-xs text-slate-400">Nenhum evento registrado no histórico deste contrato.</p>
      </div>
    );
  }

  // Reverse to show most recent first, or chronological (oldest to newest)
  // Chronological order (creation at top, progressing downwards to current status) is standard for status progress timelines,
  // but let's highlight the latest active status prominently!
  const sortedHistory = [...history];

  const getStatusBadgeStyle = (status: ClientContract['status']) => {
    switch (status) {
      case 'Homologado':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Ativo / Em Implantação':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'Aguardando Provisionamento':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Pendente Assinatura Digital':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'Cancelado':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getStatusNodeIcon = (status: ClientContract['status'], isLatest: boolean) => {
    switch (status) {
      case 'Homologado':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Ativo / Em Implantação':
        return <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Aguardando Provisionamento':
        return <Clock className="w-3.5 h-3.5 text-amber-400" />;
      case 'Pendente Assinatura Digital':
        return <FileSignature className="w-3.5 h-3.5 text-purple-400" />;
      case 'Cancelado':
        return <XCircle className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Linha do Tempo de Status
            </h4>
            <span className="text-[10px] text-slate-400">
              Auditoria de transições de provisionamento e homologação
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
          {sortedHistory.length} {sortedHistory.length === 1 ? 'evento' : 'eventos'}
        </span>
      </div>

      {/* Vertical Timeline Track */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-3.5 before:top-2 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/60 before:via-cyan-500/40 before:to-slate-800">
        {sortedHistory.map((item, index) => {
          const isLatest = index === sortedHistory.length - 1;
          const isInitial = index === 0 && !item.fromStatus;

          return (
            <div key={item.id || index} className="relative group">
              {/* Timeline Node Bullet */}
              <div 
                className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isLatest
                    ? 'bg-slate-900 ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-900 border border-slate-700'
                }`}
              >
                {getStatusNodeIcon(item.toStatus, isLatest)}
              </div>

              {/* Event Content Card */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                isLatest
                  ? 'bg-slate-900/90 border-slate-700/90 shadow-md shadow-black/40'
                  : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700/60'
              }`}>
                {/* Transition Tags & Timestamp */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.fromStatus ? (
                      <>
                        <span className="px-2 py-0.5 rounded-md font-mono text-[10px] bg-slate-950 border border-slate-800 text-slate-400">
                          {item.fromStatus}
                        </span>
                        <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border ${getStatusBadgeStyle(item.toStatus)}`}>
                          {item.toStatus}
                        </span>
                      </>
                    ) : (
                      <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border ${getStatusBadgeStyle(item.toStatus)}`}>
                        {item.toStatus} {isInitial ? '(Criação do Contrato)' : ''}
                      </span>
                    )}

                    {isLatest && (
                      <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                        Status Atual
                      </span>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 shrink-0">
                    <Clock className="w-3 h-3 text-emerald-400/80" />
                    <span>{item.timestamp}</span>
                  </div>
                </div>

                {/* Author Info */}
                {item.author && (
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400">
                    <UserCheck className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="font-medium text-slate-300">{item.author}</span>
                  </div>
                )}

                {/* Transition Note */}
                {item.note && (
                  <p className="mt-2 text-xs text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed font-sans">
                    {item.note}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
