const CircularGauge = ({
  size = 200,
  strokeWidth = 10,
  ticks = 30,
  tickLength = 10,
  activeTickLength = 8,
  tickColor = "#ccc",
  activeTickColor = "#fff",
  minHpa = 950,
  maxHpa = 1050,
  value = 1000,
  dotWidth = 12,
  dotHeight = 6,
  dotColor = "#2196f3",
  dotRadius = 4,
}) => {
  const center = size / 2;
  const radius = center - strokeWidth;

  // Start and end angles for bottom half arc (left-bottom to right-bottom)
  const startAngle = 140;
  const endAngle = 400;

  let arcDegrees = endAngle - startAngle;
  if (arcDegrees < 0) arcDegrees += 360;

  const degreesPerTick = arcDegrees / (ticks - 1);

  // Normalize value from hPa range to 0-100%
  const normalizedValue = ((value - minHpa) / (maxHpa - minHpa)) * 100;

  // Calculate dot angle based on normalized value
  const angleDeg = startAngle + (normalizedValue / 100) * arcDegrees;
  const angleRad = (angleDeg * Math.PI) / 180;

  // Dot position
  const dotX = center + radius * Math.cos(angleRad);
  const dotY = center + radius * Math.sin(angleRad);
  const dotRotation = angleDeg - 90;

  // Find active tick index
  const activeTickIndex = Math.round((normalizedValue / 100) * (ticks - 1));

  // Generate ticks
  const tickLines = [];
  for (let i = 0; i < ticks; i++) {
    const tickAngleDeg = startAngle + i * degreesPerTick;
    const tickAngleRad = (tickAngleDeg * Math.PI) / 180;

    const isActive = i === activeTickIndex;
    const currentTickLength = isActive ? activeTickLength : tickLength;
    const strokeW = isActive ? 4 : 2;
    const strokeCol = isActive ? activeTickColor : tickColor;

    const x1 = center + radius * Math.cos(tickAngleRad);
    const y1 = center + radius * Math.sin(tickAngleRad);
    const x2 = center + (radius - currentTickLength) * Math.cos(tickAngleRad);
    const y2 = center + (radius - currentTickLength) * Math.sin(tickAngleRad);

    tickLines.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={strokeCol}
        strokeWidth={strokeW}
        strokeLinecap="round"
        filter={isActive ? "url(#glow)" : undefined}
      />
    );
  }

  const lowAngleRad = (startAngle * Math.PI) / 180;
  const highAngleRad = (endAngle * Math.PI) / 180;
  const labelRadius = radius - 10;

  const lowX = center + labelRadius * Math.cos(lowAngleRad);
  const lowY = center + labelRadius * Math.sin(lowAngleRad) + 25;

  const highX = center + labelRadius * Math.cos(highAngleRad);
  const highY = center + labelRadius * Math.sin(highAngleRad) + 25;

  return (
    <svg width={size} height={size / 2 + strokeWidth * 3}>
      <defs>
        <filter id="glow" height="300%" width="300%" x="-100%" y="-100%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="2"
            floodColor={activeTickColor}
            floodOpacity="0.9"
          />
        </filter>
      </defs>

      {/* Ticks */}
      {tickLines}

      {/* Dot */}
      <rect
        x={dotX - dotWidth / 1.4}
        y={dotY - dotHeight / 1.4}
        width={dotWidth}
        height={dotHeight}
        fill={dotColor}
        rx={dotRadius}
        ry={dotRadius}
        transform={`rotate(${dotRotation} ${dotX} ${dotY})`}
      />

      {/* Centered value text below */}
      <text
        x={center}
        y={center}
        fontSize="1rem"
        fontWeight="600"
        textAnchor="middle"
        fill={dotColor}
      >
        {value}
      </text>
      <text
        x={center}
        y={center + 20}
        fontSize="0.875rem"
        fontWeight="400"
        textAnchor="middle"
        fill={dotColor}
      >
        hPa
      </text>
      {/* Low label */}
      <text
        x={lowX}
        y={lowY}
        fontSize="0.875rem"
        fontWeight="400"
        textAnchor="middle"
        fill={dotColor}
      >
        Low
      </text>

      {/* High label */}
      <text
        x={highX}
        y={highY}
        fontSize="0.875rem"
        fontWeight="400"
        textAnchor="middle"
        fill={dotColor}
      >
        High
      </text>
    </svg>
  );
};

export default CircularGauge;
