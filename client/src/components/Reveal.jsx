import { motion } from 'framer-motion';

/**
 * Wraps children in a smooth fade-up entrance animation that
 * triggers once when the element scrolls into view.
 */
export default function Reveal({ children, delay = 0, y = 28, className = '', once = true }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount: 0.25 }}
            transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            {children}
        </motion.div>
    );
}
