
export const ActionLink = ({ children, onGo404, className = '' }: { children: React.ReactNode; onGo404: () => void; className?: string }) => (
  <button className={className} onClick={onGo404} type="button">
    {children}
  </button>
)